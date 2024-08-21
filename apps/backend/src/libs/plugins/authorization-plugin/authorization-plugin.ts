import fp from "fastify-plugin";

import { AuthError } from "~/libs/exceptions/exceptions.js";
import { HTTPHeader } from "~/libs/modules/http/http.js";
import { BaseToken } from "~/libs/modules/token/base-token.module.js";
import { ServerHooks } from "~/libs/plugins/libs/enums/enums.js";
import { TokenPayload } from "~/libs/types/types.js";
import { UserService } from "~/modules/users/user.service.js";

import { ErrorMessage } from "./libs/types/enums/enums.js";

type PluginOptions = {
	token: BaseToken<TokenPayload>;
	userService: UserService;
	whiteRoutes?: string[];
};

const authorizationPlugin = fp<PluginOptions>(
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
					cause: request,
					message: ErrorMessage.MISSING_AUTHORIZATION_HEADER,
				});
			}

			try {
				const {
					payload: { userId },
				} = await token.decode(header);

				const user = await userService.find(userId);

				if (!user) {
					throw new AuthError({ message: ErrorMessage.USER_NOT_FOUND });
				}

				request.user = user.toObject();
			} catch (error) {
				if (error instanceof AuthError) {
					throw error;
				}

				throw new AuthError({
					cause: error,
					message: ErrorMessage.INVALID_TOKEN,
				});
			}
		});
	},
	{ name: "authorization-plugin" },
);

export { authorizationPlugin };
