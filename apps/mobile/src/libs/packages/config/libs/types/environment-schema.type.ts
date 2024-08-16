import { type AppEnvironment } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
	};
	API: {
		ORIGIN_URL: string;
	};
};

export { type EnvironmentSchema };
