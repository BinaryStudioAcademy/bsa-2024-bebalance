import { type SavePasswordFormDto } from "~/modules/users/users.js";

const DEFAULT_SAVE_PASSWORD_PAYLOAD: SavePasswordFormDto = {
	confirmPassword: "",
	newPassword: "",
};

export { DEFAULT_SAVE_PASSWORD_PAYLOAD };
