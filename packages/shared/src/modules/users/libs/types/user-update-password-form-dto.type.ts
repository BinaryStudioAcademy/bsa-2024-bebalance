import { type UserUpdatePasswordRequestDto } from "./user-update-password-request-dto.type.js";

type UserUpdatePasswordFormDto = {
	confirmPassword: string;
} & Omit<UserUpdatePasswordRequestDto, "email" | "jwtToken">;

export { type UserUpdatePasswordFormDto };
