import { AuthApiPath } from "~/modules/auth/auth.js";

import { APIPath } from "../enums/enums.js";

const WHITE_ROUTES: string[] = [
	"/documentation",
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
	`${APIPath.AUTH}${AuthApiPath.FORGOT_PASSWORD}`,
	`${APIPath.AUTH}${AuthApiPath.RESET_PASSWORD}`,
	`${APIPath.AUTH}${AuthApiPath.CHECK_RESET_PASSWORD_EXPIRATION}`,
];

export { WHITE_ROUTES };
