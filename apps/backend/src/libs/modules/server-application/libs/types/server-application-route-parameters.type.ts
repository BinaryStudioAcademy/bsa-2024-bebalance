import { type FastifyReply, type FastifyRequest } from "fastify";

import { type APIPreHandler } from "~/libs/modules/controller/libs/types/types.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

type ServerApplicationRouteParameters = {
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	method: HTTPMethod;
	path: string;
	preHandlers: APIPreHandler[];
	validation?: {
		body?: ValidationSchema;
		query?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
