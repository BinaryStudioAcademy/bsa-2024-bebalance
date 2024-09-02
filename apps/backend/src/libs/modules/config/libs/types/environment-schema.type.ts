import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
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
	S3_BUCKET: {
		BUCKET_ACCESS_KEY: string;
		BUCKET_NAME: string;
		BUCKET_REGION: string;
		SECRET_ACCESS_KEY: string;
	};
};

export { type EnvironmentSchema };
