import { APIPath, AuthApiPath } from "shared";

const WHITE_ROUTES: string[] = [
	APIPath.AUTH,
	`${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
