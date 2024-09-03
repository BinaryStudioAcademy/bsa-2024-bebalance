import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { type ValueOf } from "~/libs/types/types.js";

import { routesWithoutAuthWrapper } from "../constants/constants.js";

function hasAuthWrapper(pathname: ValueOf<typeof AppRoute>): boolean {
	return !routesWithoutAuthWrapper.includes(pathname);
}

export { hasAuthWrapper };
