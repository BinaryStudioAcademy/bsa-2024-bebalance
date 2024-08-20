import fp from "fastify-plugin";

import { HTTPCode, HTTPHeader } from "~/libs/modules/http/http.js";
import { ServerHooks } from "~/libs/plugins/libs/enums/enums.js";

type PluginOptions = {
	excludedRoutePrefixes?: string[];
	tokenVerifier: (token: string) => Promise<unknown>;
};

const authPlugin = fp<PluginOptions>(
	(app, { excludedRoutePrefixes = [], tokenVerifier }) => {
		app.addHook(ServerHooks.PRE_HANDLER, async (request, reply) => {
			const whiteRoute = excludedRoutePrefixes.find((route) =>
				request.url.startsWith(route),
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
