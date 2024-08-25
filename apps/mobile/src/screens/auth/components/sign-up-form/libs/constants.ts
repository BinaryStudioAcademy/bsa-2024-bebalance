import { type UserSignUpSubmitDto } from "~/packages/users/users";

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpSubmitDto = {
	confirmPassword: "",
	email: "",
	name: "",
	password: "",
};

export { USER_SIGN_UP_DEFAULT_VALUES };
