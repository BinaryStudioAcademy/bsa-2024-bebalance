import { type FastifyReply, type FastifyRequest } from "fastify";

import { type HTTPMethodType } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";

type ServerApplicationRouteParameters = {
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	method: HTTPMethodType;
	path: string;
	validation?: {
		body?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
