import fp from "fastify-plugin";

import { AuthError } from "~/libs/exceptions/exceptions.js";
import { HTTPHeader } from "~/libs/modules/http/http.js";
import { ServerHooks } from "~/libs/plugins/libs/enums/enums.js";

type PluginOptions = {
	tokenVerifier: (token: string) => Promise<unknown>;
	whiteRoutes?: string[];
};

const authPlugin = fp<PluginOptions>(
	(app, { tokenVerifier, whiteRoutes = [] }) => {
		app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
			const whiteRoute = whiteRoutes.find(
				(route) => request.routeOptions.url === route,
			);

			if (whiteRoute) {
				return;
			}

			const token = request.headers[HTTPHeader.AUTHORIZATION];

			if (!token) {
				throw new AuthError({
					message: "Authorization header required for this route",
				});
			}

			try {
				request.user = await tokenVerifier(token);
			} catch (error) {
				throw new AuthError({ cause: error, message: "Invalid token" });
			}
		});
	},
	{ name: "auth-plugin" },
);

export { authPlugin };
