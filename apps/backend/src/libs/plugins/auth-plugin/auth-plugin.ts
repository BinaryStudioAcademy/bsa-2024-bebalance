import fp from "fastify-plugin";

import { AuthError } from "~/libs/exceptions/exceptions.js";
import { HTTPHeader } from "~/libs/modules/http/http.js";
import { BaseToken } from "~/libs/modules/token/base-token.module.js";
import { ServerHooks } from "~/libs/plugins/libs/enums/enums.js";
import { TokenPayload } from "~/libs/types/types.js";
import { UserService } from "~/modules/users/user.service.js";

type PluginOptions = {
	token: BaseToken<TokenPayload>;
	userService: UserService;
	whiteRoutes?: string[];
};

const authPlugin = fp<PluginOptions>(
	(app, { token, userService, whiteRoutes = [] }) => {
		app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
			const whiteRoute = whiteRoutes.find(
				(route) => request.routeOptions.url === route,
			);

			if (whiteRoute) {
				return;
			}

			const header = request.headers[HTTPHeader.AUTHORIZATION];

			if (!header) {
				throw new AuthError({
					message: "Authorization header required for this route",
				});
			}

			try {
				const {
					payload: { userId },
				} = await token.decode(header);

				const user = await userService.findById(userId.toString());

				if (!user) {
					throw new AuthError({ message: "User not found" });
				}

				request.user = user;
			} catch (error) {
				if (error instanceof AuthError) {
					throw error;
				}

				throw new AuthError({ cause: error, message: "Invalid token" });
			}
		});
	},
	{ name: "auth-plugin" },
);

export { authPlugin };
