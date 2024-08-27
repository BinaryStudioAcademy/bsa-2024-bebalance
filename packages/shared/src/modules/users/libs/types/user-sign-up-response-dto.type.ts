import { type UserDto } from "./user-dto.type.js";

type UserSignUpResponseDto = {
	token: string;
	user: UserDto;
};

export { type UserSignUpResponseDto };
