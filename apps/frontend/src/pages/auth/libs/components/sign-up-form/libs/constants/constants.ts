import { type UserSignUpFormDto } from "~/modules/users/users.js";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpFormDto = {
	confirmPassword: "",
	email: "",
	name: "",
	password: "",
};

export { DEFAULT_SIGN_UP_PAYLOAD };
