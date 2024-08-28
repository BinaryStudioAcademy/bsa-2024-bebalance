import { type ResetPasswordDto } from "~/modules/users/users.js";

const DEFAULT_RESET_PASSWORD_PAYLOAD: Omit<ResetPasswordDto, "jwtToken"> = {
	confirmPassword: "",
	newPassword: "",
};

export { DEFAULT_RESET_PASSWORD_PAYLOAD };
