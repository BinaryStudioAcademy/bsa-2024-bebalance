import { type FastifyPluginCallback } from "fastify";

import { HTTPCode } from "~/libs/modules/http/libs/enums/enums.js";

type PluginOptions = {
	/** Define route prefixes to be excluded by `authPlugin` */
	excludedRoutePrefixes?: string[];
};

/**
 * Apply `onRequest` hook to authenticate requests.
 *
 * Authenticated payload will be stored in `req.authUser` for the route handler to use.
 */
const authPlugin: FastifyPluginCallback<PluginOptions> = (
	app,
	{ excludedRoutePrefixes = [] },
) => {
	app.addHook("onRequest", (request, reply) => {
		for (const routePrefix of excludedRoutePrefixes) {
			if (request.url.startsWith(routePrefix)) {
				return;
			}
		}

		const token = request.headers.authorization;

		if (!token) {
			return reply
				.code(HTTPCode.UNAUTHORIZED)
				.send({ message: "Authorization header required for this route" });
		}

		// TODO: Implement token validation by JWT manager
		request.authUser = token;
	});
};

export { authPlugin };
