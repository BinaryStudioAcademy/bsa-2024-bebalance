import { APIPath, AuthApiPath } from "../enums/enums.js";

const WHITE_ROUTES: string[] = [
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
