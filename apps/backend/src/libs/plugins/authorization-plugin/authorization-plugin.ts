import fp from "fastify-plugin";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPHeader } from "~/libs/modules/http/http.js";
import { type BaseToken } from "~/libs/modules/token/token.js";
import { type TokenPayload } from "~/libs/types/types.js";
import { AuthError } from "~/modules/auth/auth.js";
import { type UserService } from "~/modules/users/users.js";

import { ServerHooks } from "../libs/enums/enums.js";
import { checkIsWhiteRoute } from "./libs/helpers/helpers.js";

type PluginOptions = {
	token: BaseToken<TokenPayload>;
	userService: UserService;
	whiteRoutes?: string[];
};

const authorizationPlugin = fp<PluginOptions>((app, options, done) => {
	const { token, userService, whiteRoutes = [] } = options;

	app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
		const { headers, url } = request;

		if (checkIsWhiteRoute(url, whiteRoutes)) {
			return;
		}

		const header = headers[HTTPHeader.AUTHORIZATION];

		if (!header) {
			throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
		}

		const headerToken = header.replace("Bearer ", "");

		try {
			const {
				payload: { userId },
			} = await token.decode(headerToken);

			const user = await userService.find(userId);

			if (!user) {
				throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
			}

			request.user = user;
		} catch (error) {
			if (error instanceof AuthError) {
				throw error;
			}

			throw new AuthError({ message: ErrorMessage.UNAUTHORIZED });
		}
	});

	done();
});

export { authorizationPlugin };
