import { AuthApiPath } from "~/modules/auth/libs/enums/enums.js";

import { APIPath } from "../enums/enums.js";

const WHITE_ROUTES: string[] = [
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
