import { type UserUpdateRequestDto } from "shared";

type UserUpdatePayload = {
	data: UserUpdateRequestDto;
	id: number;
};

export { type UserUpdatePayload };
export {
	type UserDto,
	type UserGetAllResponseDto,
	type UserGetParametersDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type UserUpdateRequestDto,
} from "shared";
