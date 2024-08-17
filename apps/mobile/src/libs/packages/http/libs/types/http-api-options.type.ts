import { type ContentType } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { type HTTPOptions } from "./types";

type HTTPApiOptions = {
	contentType: ValueOf<typeof ContentType>;
	hasAuth: boolean;
	payload?: HTTPOptions["payload"];
} & Omit<HTTPOptions, "headers" | "payload">;

export { type HTTPApiOptions };
