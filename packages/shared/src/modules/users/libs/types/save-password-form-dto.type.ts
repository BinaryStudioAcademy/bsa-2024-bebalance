import { type SavePasswordDto } from "./save-password-dto.type.js";

type SavePasswordFormDto = {
	confirmPassword: string;
} & Omit<SavePasswordDto, "jwtToken">;

export { type SavePasswordFormDto };
