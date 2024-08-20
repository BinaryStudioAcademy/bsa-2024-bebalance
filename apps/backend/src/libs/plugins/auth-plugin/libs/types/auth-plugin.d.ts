import "fastify";
import { UserDto } from "shared";

declare module "fastify" {
	interface FastifyRequest {
		user?: UserDto;
	}
}
