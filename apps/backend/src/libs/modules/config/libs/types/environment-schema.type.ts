import { type AppEnvironment } from "~/libs/enums/enums.js";
import {
	Algorithm,
	ExpirationTime,
} from "~/libs/modules/token/libs/types/types.js";
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
		ALGORITHM: Algorithm;
		EXPIRATION_TIME: ExpirationTime;
		SECRET: string;
	};
};

export { type EnvironmentSchema };
