import "fastify";

declare module "fastify" {
	interface FastifyRequest {
		/** Authenticated user from `authPlugin` */
		authUser?: unknown;
	}
}
