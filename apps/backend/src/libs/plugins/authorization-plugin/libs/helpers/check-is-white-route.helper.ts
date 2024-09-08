import { ZERO_INDEX } from "~/libs/constants/constants.js";

const checkIsWhiteRoute = (url: string, whiteRoutes: string[]): boolean => {
	const regex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(regex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	const routeWithoutQuery = route.split("?")[ZERO_INDEX] as string;

	return whiteRoutes.includes(routeWithoutQuery);
};

export { checkIsWhiteRoute };
