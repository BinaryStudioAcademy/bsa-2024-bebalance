import { FastifyReply, FastifyRequest } from "fastify";

const tokenVerificationMiddleware = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	await request.verifyJWT(request, reply);
};

export { tokenVerificationMiddleware };
