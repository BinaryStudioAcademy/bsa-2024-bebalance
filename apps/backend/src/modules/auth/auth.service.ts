import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { token } from "../../libs/modules/token/token.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email } = userRequestDto;
		const user = await this.userService.findByEmail(email);
		const jwtToken = await token.createToken({ userId: user.id });

		return { token: jwtToken, user };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.userService.create(userRequestDto);
		const jwtToken = await token.createToken({ userId: user.id });

		return { token: jwtToken, user };
	}
}

export { AuthService };
