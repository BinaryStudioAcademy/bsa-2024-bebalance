import fp from "fastify-plugin";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPHeader } from "~/libs/modules/http/http.js";
import { BaseToken } from "~/libs/modules/token/token.js";
import { TokenPayload } from "~/libs/types/types.js";
import { AuthError } from "~/modules/auth/auth.js";
import { UserService } from "~/modules/users/users.js";

import { ServerHooks } from "../libs/enums/enums.js";

type PluginOptions = {
	token: BaseToken<TokenPayload>;
	userService: UserService;
	whiteRoutes?: string[];
	whiteRoutesPrefix?: string;
};

const authorizationPlugin = fp<PluginOptions>(
	(
		app,
		{ token, userService, whiteRoutes = [], whiteRoutesPrefix = "/v1" },
		done,
	) => {
		app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
			const isWhiteRoute = whiteRoutes.some((whiteRoute) => {
				return request.url === `${whiteRoutesPrefix}${whiteRoute}`;
			});

			if (isWhiteRoute) {
				return;
			}

			const header = request.headers[HTTPHeader.AUTHORIZATION];

			if (!header) {
				throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
			}

			try {
				const {
					payload: { userId },
				} = await token.decode(header);

				const user = await userService.find(userId);

				if (!user) {
					throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
				}

				request.user = user.toObject();
			} catch (error) {
				if (error instanceof AuthError) {
					throw error;
				}

				throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
			}
		});

		done();
	},
);

export { authorizationPlugin };
