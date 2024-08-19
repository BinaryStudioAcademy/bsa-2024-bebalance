import { ErrorMessage } from "~/libs/enums/enums.js";
import { AuthError, HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

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

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

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
