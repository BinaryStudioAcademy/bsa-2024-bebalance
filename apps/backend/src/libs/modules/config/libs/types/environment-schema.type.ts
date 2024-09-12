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
	DURATIONS: {
		PASSWORD_RESET_LINK: string;
		SESSION: string;
	};
	JWT: {
		ALGORITHM: string;
		SECRET: string;
	};

	MAILER: {
		ADDRESS: string;
		APP_PASSWORD: string;
		HOST: string;
		PORT: number;
		SERVICE: string;
	};
	OPEN_AI: {
		API_KEY: string;
		MODEL: string;
	};
};

export { type EnvironmentSchema };
