import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { HTTPCode, UserValidationMessage } from "./libs/enums/enums.js";
import { HTTPError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email } = userRequestDto;
		const userWithSameEmail = await this.userService.findByEmail(email);

		if (userWithSameEmail) {
			throw new HTTPError({
				message: UserValidationMessage.EMAIL_TAKEN,
				status: HTTPCode.CONFLICT,
			});
		}

		return await this.userService.create(userRequestDto);
	}
}

export { AuthService };
