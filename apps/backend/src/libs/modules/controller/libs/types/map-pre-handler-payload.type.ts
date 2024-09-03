/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type ServerApplicationRouteParameters } from "~/libs/modules/server-application/server-application.js";

import { type APIPreHandler } from "./api-pre-handler.type.js";

type MapPreHandlerPayload = {
	done: Parameters<ServerApplicationRouteParameters["preHandlers"][0]>[2];
	preHandler: APIPreHandler;
	reply: Parameters<ServerApplicationRouteParameters["preHandlers"][0]>[1];
	request: Parameters<ServerApplicationRouteParameters["preHandlers"][0]>[0];
};

export { type MapPreHandlerPayload };
