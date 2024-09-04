import {
	type FastifyReply,
	type FastifyRequest,
	type HookHandlerDoneFunction,
} from "fastify";

type APIPreHandler = (
	request: FastifyRequest,
	reply: FastifyReply,
	done: HookHandlerDoneFunction,
) => void;

export { type APIPreHandler };
