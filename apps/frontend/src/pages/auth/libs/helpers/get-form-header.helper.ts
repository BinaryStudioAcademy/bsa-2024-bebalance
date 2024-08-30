import { authRouteToHeader } from "../maps/maps.js";
import { matchResetPasswordRoute } from "./match-reset-password-route.helper.js";

function getFormHeader(pathname: string): string {
	return matchResetPasswordRoute(pathname)
		? "Reset password"
		: (authRouteToHeader[pathname] as string);
}

export { getFormHeader };
