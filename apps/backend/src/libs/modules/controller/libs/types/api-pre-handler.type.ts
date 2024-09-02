import { type APIHandlerOptions } from "./api-handler-options.type.js";
import { type APIPreHandlerResponse } from "./api-pre-handler-response.type.js";

type APIPreHandler = (
	options: APIHandlerOptions,
) => APIPreHandlerResponse | Promise<APIPreHandlerResponse>;

export { type APIPreHandler };
