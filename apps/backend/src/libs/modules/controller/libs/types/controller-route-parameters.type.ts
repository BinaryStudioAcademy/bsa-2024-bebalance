import { type HTTPMethodType } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

import { type APIHandler } from "./api-handler.type.js";

type ControllerRouteParameters = {
	handler: APIHandler;
	method: HTTPMethodType;
	path: string;
	validation?: {
		body?: ValidationSchema;
	};
};

export { type ControllerRouteParameters };
