import "fastify";

import { type UserDto } from "~/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest {
		user?: UserDto;
	}
}
