import { type UserSignUpFormDto } from "~/packages/users/users";

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpFormDto = {
	confirmPassword: "",
	email: "",
	name: "",
	password: "",
};

export { USER_SIGN_UP_DEFAULT_VALUES };
