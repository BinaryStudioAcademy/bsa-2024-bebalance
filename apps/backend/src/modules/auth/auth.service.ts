import { UserDto } from "shared/src/modules/users/libs/types/user-dto.type.js";

import { type UserSignUpRequestDto } from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public signUp(userRequestDto: UserSignUpRequestDto): Promise<UserDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
