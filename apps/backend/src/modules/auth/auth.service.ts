import { UserDto } from "shared/src/modules/users/libs/types/user-dto.type.js";

import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signIn(userRequestDto: UserSignInRequestDto): Promise<UserDto> {
		const { email } = userRequestDto;
		return await this.userService.find({ email });
	}

	public signUp(userRequestDto: UserSignUpRequestDto): Promise<UserDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
