import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { ROUTES_WITHOUT_AUTH_WRAPPER } from "../constants/constants.js";

function checkHasAuthWrapper(pathname: ValueOf<typeof AppRoute>): boolean {
	return !ROUTES_WITHOUT_AUTH_WRAPPER.includes(pathname);
}

export { checkHasAuthWrapper };
