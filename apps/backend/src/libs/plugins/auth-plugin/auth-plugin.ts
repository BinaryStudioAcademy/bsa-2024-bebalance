import { type FastifyPluginCallback } from "fastify";

import { HTTPCode } from "~/libs/modules/http/libs/enums/enums.js";

type PluginOptions = {
	excludedRoutePrefixes?: string[];
	tokenVerifier: (token: string) => Promise<unknown>;
};

const authPlugin: FastifyPluginCallback<PluginOptions> = (
	app,
	{ excludedRoutePrefixes = [], tokenVerifier },
) => {
	app.addHook("preHandler", async (request, reply) => {
		for (const routePrefix of excludedRoutePrefixes) {
			if (request.url.startsWith(routePrefix)) {
				return;
			}
		}

		const token = request.headers.authorization;

		if (!token) {
			return await reply
				.code(HTTPCode.UNAUTHORIZED)
				.send({ message: "Authorization header required for this route" });
		}

		try {
			request.authUser = await tokenVerifier(token);
		} catch {
			reply.code(HTTPCode.UNAUTHORIZED).send({ message: "Invalid token" });
		}
	});
};

export { authPlugin };
