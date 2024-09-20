import EnvConfig from "react-native-config";

import { type AppEnvironment } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { type Config, type EnvironmentSchema } from "./libs/types/types";

class BaseConfig implements Config {
	public ENV: EnvironmentSchema;

	public constructor() {
		this.ENV = this.envSchema;
	}

	private get envSchema(): EnvironmentSchema {
		return {
			API: {
				HOST: EnvConfig["API_URL_HOST"] as string,
				ORIGIN_URL: EnvConfig["API_URL"] as string,
				SCHEME: EnvConfig["API_URL_SCHEME"] as string,
			},
			APP: {
				ENVIRONMENT: EnvConfig["ENVIRONMENT"] as ValueOf<typeof AppEnvironment>,
			},
		};
	}
}

export { BaseConfig };
