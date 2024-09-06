import { type ValueOf } from "~/libs/types/types.js";

import { type BucketCommands } from "../enums/enums.js";
import { type CommandParameters } from "./command-parameters.type.js";

type Options = {
	commandType: ValueOf<typeof BucketCommands>;
	parameters: CommandParameters;
};

export { type Options };
