import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
	};
	BASE_URLS: {
		RESET_PASSWORD_URL: string;
	};
	DB: {
		CONNECTION_STRING: string;
		DIALECT: string;
		POOL_MAX: number;
		POOL_MIN: number;
	};
	JWT: {
		ALGORITHM: string;
		EXPIRATION_TIME: string;
		SECRET: string;
	};
	MAILER: {
		ADDRESS: string;
		APP_PASSWORD: string;
		HOST: string;
		PORT: number;
		SERVICE: string;
	};
	S3_BUCKET: {
		BUCKET_ACCESS_KEY: string;
		BUCKET_NAME: string;
		BUCKET_REGION: string;
		SECRET_ACCESS_KEY: string;
	};
};

export { type EnvironmentSchema };
