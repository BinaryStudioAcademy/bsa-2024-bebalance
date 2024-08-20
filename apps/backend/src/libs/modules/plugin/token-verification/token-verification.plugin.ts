import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
	HookHandlerDoneFunction,
} from "fastify";
import fp from "fastify-plugin";
import { JWTPayload, jwtVerify } from "jose";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { AuthError, HTTPError, ServerError } from "~/libs/modules/http/http.js";

declare module "fastify" {
	interface FastifyRequest {
		userPayload?: { id: number } | JWTPayload;
		verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

const verifyJWT = function (
	fastify: FastifyInstance,
	_: FastifyPluginOptions,
	done: HookHandlerDoneFunction,
) {
	fastify.decorateRequest("verifyJWT", async (request: FastifyRequest) => {
		try {
			const authentication = request.headers.authorization;
			if (!authentication) {
				throw new AuthError({
					cause: "No authentication token provided",
					message: ErrorMessage.UNAUTHORIZED,
				});
			}

			const [scheme, token] = authentication.split(" ");
			if (scheme !== "Bearer" || !token) {
				throw new AuthError({
					cause: "Invalid authentication scheme",
					message: ErrorMessage.UNAUTHORIZED,
				});
			}

			const secret: Uint8Array = new TextEncoder().encode(
				process.env["JWT_SECRET_KEY"] as string,
			);
			try {
				const verifiedToken = await jwtVerify(token, secret);
				request.userPayload = verifiedToken.payload;
			} catch {
				throw new AuthError({
					cause: "Invalid or expired token",
					message: ErrorMessage.UNAUTHORIZED,
				});
			}
		} catch (error) {
			throw error instanceof HTTPError
				? error
				: new ServerError({
						cause: "Unknown error occurred",
						message: ErrorMessage.INTERNAL_SERVER_ERROR,
					});
		}
	});

	done();
};

const verifyJWTPlugin = fp(verifyJWT, {
	name: "verifyJWT",
});

export { verifyJWTPlugin };
