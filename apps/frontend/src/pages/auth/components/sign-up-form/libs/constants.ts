import { type UserSignUpFormDto } from "~/modules/users/users.js";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpFormDto = {
	confirmPassword: "",
	email: "",
	name: "",
	password: "",
};
const CONFIRM_PASSWORD_KEY = "confirmPassword";
const CONFIRM_PASSWORD_ERROR_MESSAGE = "Passwords don't match";
const CONFIRM_PASSWORD_ERROR_TYPE = "custom";

export {
	CONFIRM_PASSWORD_ERROR_MESSAGE,
	CONFIRM_PASSWORD_ERROR_TYPE,
	CONFIRM_PASSWORD_KEY,
	DEFAULT_SIGN_UP_PAYLOAD,
};
