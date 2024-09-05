import { type ResetPasswordFormDto } from "~/modules/users/users.js";

const DEFAULT_RESET_PASSWORD_PAYLOAD: ResetPasswordFormDto = {
	confirmPassword: "",
	newPassword: "",
};

export { DEFAULT_RESET_PASSWORD_PAYLOAD };
