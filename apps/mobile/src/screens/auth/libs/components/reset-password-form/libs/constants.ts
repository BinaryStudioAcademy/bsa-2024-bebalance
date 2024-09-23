import { type ResetPasswordFormDto } from "~/packages/users/users";

const RESET_PASSWORD_FORM_DEFAULT_VALUES: ResetPasswordFormDto = {
	confirmPassword: "",
	newPassword: "",
};

export { RESET_PASSWORD_FORM_DEFAULT_VALUES };
