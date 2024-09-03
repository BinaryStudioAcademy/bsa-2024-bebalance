import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const routesWithoutAuthWrapper = [AppRoute.QUIZ] as ValueOf<typeof AppRoute>[];

export { routesWithoutAuthWrapper };
