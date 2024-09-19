import { type UserUpdatePasswordRequestDto } from "./user-update-password-request-dto.type.js";

type UserUpdatePasswordFormDto = {
	confirmNewPassword: string;
} & Omit<UserUpdatePasswordRequestDto, "email">;

export { type UserUpdatePasswordFormDto };
