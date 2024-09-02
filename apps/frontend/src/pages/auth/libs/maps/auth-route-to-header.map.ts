import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RoutesWithHeader } from "../types/routes-with-header.type.js";

const authRouteToHeader: Record<ValueOf<RoutesWithHeader>, string> = {
	[AppRoute.FORGOT_PASSWORD]: "forgot password",
	[AppRoute.RESET_PASSWORD]: "reset password",
	[AppRoute.SIGN_IN]: "sign in",
	[AppRoute.SIGN_UP]: "sign up",
};

export { authRouteToHeader };
