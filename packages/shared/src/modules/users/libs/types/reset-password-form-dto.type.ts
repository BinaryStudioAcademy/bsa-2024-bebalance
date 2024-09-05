import { type ResetPasswordDto } from "./reset-password-dto.type.js";

type ResetPasswordFormDto = {
	confirmPassword: string;
} & Omit<ResetPasswordDto, "jwtToken">;

export { type ResetPasswordFormDto };
