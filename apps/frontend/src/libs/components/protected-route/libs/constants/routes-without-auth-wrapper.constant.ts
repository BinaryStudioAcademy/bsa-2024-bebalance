import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const ROUTES_WITHOUT_AUTH_WRAPPER: ValueOf<typeof AppRoute>[] = [
	AppRoute.ONBOARDING,
	AppRoute.QUIZ,
];

export { ROUTES_WITHOUT_AUTH_WRAPPER };
