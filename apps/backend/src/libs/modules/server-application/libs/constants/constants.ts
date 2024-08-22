import { AuthApiPath } from "~/modules/auth/auth.js";

import { APIPath } from "../enums/enums.js";

const WHITE_ROUTES: string[] = [
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_IN}`,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
