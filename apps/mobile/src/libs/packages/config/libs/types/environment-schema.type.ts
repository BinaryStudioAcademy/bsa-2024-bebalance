import { type AppEnvironment } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type EnvironmentSchema = {
	API: {
		HOST: string;
		ORIGIN_URL: string;
		SCHEME: string;
	};
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
};

export { type EnvironmentSchema };
