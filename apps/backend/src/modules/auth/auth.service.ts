import { ErrorMessage } from "~/libs/enums/enums.js";
import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { AuthError } from "~/modules/auth/libs/exceptions/exceptions.ts.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private encrypt: Encrypt;
	private userService: UserService;

	public constructor(userService: UserService, encrypt: Encrypt) {
		this.userService = userService;
		this.encrypt = encrypt;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;
		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const isPasswordValid = await this.encrypt.compare(
			password,
			user.toNewObject().passwordHash,
		);

		if (!isPasswordValid) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return user.toObject();
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
