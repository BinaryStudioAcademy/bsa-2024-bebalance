import { type AppEnvironment } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type EnvironmentSchema = {
	API: {
		ORIGIN_URL: string;
	};
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
};

export { type EnvironmentSchema };
