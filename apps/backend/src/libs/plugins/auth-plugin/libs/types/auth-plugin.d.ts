import "fastify";

declare module "fastify" {
	interface FastifyRequest {
		authUser?: unknown;
	}
}
