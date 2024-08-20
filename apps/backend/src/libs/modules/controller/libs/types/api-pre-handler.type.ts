import { FastifyReply, FastifyRequest } from "fastify";

type APIPreHandler = (
	request: FastifyRequest,
	reply: FastifyReply,
) => Promise<void> | void;

export { type APIPreHandler };
