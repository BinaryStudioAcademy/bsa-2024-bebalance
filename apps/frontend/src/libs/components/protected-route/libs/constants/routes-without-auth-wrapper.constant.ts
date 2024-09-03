import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const ROUTES_WITHOUT_AUTH_WRAPPER = [AppRoute.QUIZ] as ValueOf<
	typeof AppRoute
>[];

export { ROUTES_WITHOUT_AUTH_WRAPPER };
