import { type AppRoute } from "~/libs/enums/app-route.enum.js";

type RoutesWithHeader = Pick<
	typeof AppRoute,
	"FORGOT_PASSWORD" | "RESET_PASSWORD" | "SIGN_IN" | "SIGN_UP"
>;

export { type RoutesWithHeader };
