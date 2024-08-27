import { type UserDto } from "./user-dto.type.js";

type UserSignInResponseDto = {
	token: string;
	user: UserDto;
};

export { type UserSignInResponseDto };
