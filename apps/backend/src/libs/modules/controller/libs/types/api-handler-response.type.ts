import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type APIHandlerResponse<TPayload = unknown> = {
	payload: TPayload;
	status: ValueOf<typeof HTTPCode>;
};

export { type APIHandlerResponse };
