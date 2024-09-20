import { type UserUpdatePasswordFormDto } from "~/modules/users/users.js";

const DEFAULT_UPDATE_PASSWORD_PAYLOAD: UserUpdatePasswordFormDto = {
	confirmNewPassword: "",
	currentPassword: "",
	newPassword: "",
};

export { DEFAULT_UPDATE_PASSWORD_PAYLOAD };
