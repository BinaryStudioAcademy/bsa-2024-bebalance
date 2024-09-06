import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	private logger: Logger;

	public ENV: EnvironmentSchema;

	public constructor(logger: Logger) {
		this.logger = logger;

		config();

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();
		this.logger.info(".env file found and successfully parsed!");
	}

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				ENVIRONMENT: {
					default: null,
					doc: "Application environment",
					env: "NODE_ENV",
					format: Object.values(AppEnvironment),
				},
				HOST: {
					default: null,
					doc: "Host for server app",
					env: "HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Port for incoming connections",
					env: "PORT",
					format: Number,
				},
			},
			BASE_URLS: {
				RESET_PASSWORD_URL: {
					default: null,
					doc: "base url for a reset user password link",
					env: "RESET_PASSWORD_URL",
					format: String,
				},
			},
			DB: {
				CONNECTION_STRING: {
					default: null,
					doc: "Database connection string",
					env: "DB_CONNECTION_STRING",
					format: String,
				},
				DIALECT: {
					default: null,
					doc: "Database dialect",
					env: "DB_DIALECT",
					format: String,
				},
				POOL_MAX: {
					default: null,
					doc: "Database pool max count",
					env: "DB_POOL_MAX",
					format: Number,
				},
				POOL_MIN: {
					default: null,
					doc: "Database pool min count",
					env: "DB_POOL_MIN",
					format: Number,
				},
			},
			DURATIONS: {
				PASSWORD_RESET_LINK: {
					default: null,
					doc: "Time during which reset password link is valid",
					env: "DURATION_RESET_PASSWORD_LINK",
					format: String,
				},
				SESSION: {
					default: null,
					doc: "Time during which user's session is active",
					env: "DURATION_SESSION",
					format: String,
				},
			},
			JWT: {
				ALGORITHM: {
					default: null,
					doc: "Token encryption algorithm",
					env: "JWT_ALGORITHM",
					format: String,
				},
				SECRET: {
					default: null,
					doc: "Used to sign and validate JWT tokens",
					env: "JWT_SECRET",
					format: String,
				},
			},
			MAILER: {
				ADDRESS: {
					default: null,
					doc: "Email used to connect to Google's SMTP service",
					env: "MAILER_ADDRESS",
					format: String,
				},
				APP_PASSWORD: {
					default: null,
					doc: "App password generated by Google, used to connect to Google's SMTP service",
					env: "MAILER_APP_PASSWORD",
					format: String,
				},
				HOST: {
					default: null,
					doc: "SMTP service host",
					env: "MAILER_HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "SMTP service port",
					env: "MAILER_PORT",
					format: Number,
				},
				SERVICE: {
					default: null,
					doc: "SMTP service provider",
					env: "MAILER_SERVICE",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
