import fp from "fastify-plugin";

import { HTTPCode, HTTPHeader } from "~/libs/modules/http/http.js";
import { ServerHooks } from "~/libs/plugins/libs/enums/enums.js";

type PluginOptions = {
	tokenVerifier: (token: string) => Promise<unknown>;
	whiteRoutes?: string[];
};

const authPlugin = fp<PluginOptions>(
	(app, { tokenVerifier, whiteRoutes = [] }) => {
		app.addHook(ServerHooks.PRE_HANDLER, async (request, reply) => {
			const whiteRoute = whiteRoutes.find(
				(route) => request.routeOptions.url === route,
			);

			if (whiteRoute) {
				return;
			}

			const token = request.headers[HTTPHeader.AUTHORIZATION];

			if (!token) {
				return await reply
					.code(HTTPCode.UNAUTHORIZED)
					.send({ message: "Authorization header required for this route" });
			}

			try {
				request.user = await tokenVerifier(token);
			} catch {
				reply.code(HTTPCode.UNAUTHORIZED).send({ message: "Invalid token" });
			}
		});
	},
	{ name: "auth-plugin" },
);

export { authPlugin };
