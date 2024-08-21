import { type FastifyReply, type FastifyRequest } from "fastify";

import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type ValidationSchema } from "~/libs/types/types.js";
import { UserDto } from "~/modules/users/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest {
		user?: UserDto;
	}
}

type ServerApplicationRouteParameters = {
	handler: (
		request: FastifyRequest,
		reply: FastifyReply,
	) => Promise<void> | void;
	method: HTTPMethod;
	path: string;
	validation?: {
		body?: ValidationSchema;
	};
};

export { type ServerApplicationRouteParameters };
