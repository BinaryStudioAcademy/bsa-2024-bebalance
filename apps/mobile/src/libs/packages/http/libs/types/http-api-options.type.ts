import { type ContentType } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { type HTTPOptions } from "./types";

type HTTPApiOptions = Omit<HTTPOptions, "headers" | "payload"> & {
	hasAuth: boolean;
	contentType: ValueOf<typeof ContentType>;
	payload?: HTTPOptions["payload"];
};

export { type HTTPApiOptions };
