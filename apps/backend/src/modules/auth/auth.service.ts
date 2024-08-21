import { ErrorMessage } from "~/libs/enums/enums.js";
import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UserValidationMessage } from "./libs/enums/enums.js";
import { AuthError } from "./libs/exceptions/exceptions.js";

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

		const userObject = user.toObject();

		const jwtToken = await token.createToken({ userId: userObject.id });

		const { passwordHash, passwordSalt } = user.toNewObject();
		const isPasswordValid = await this.encrypt.compare(
			password,
			passwordHash,
			passwordSalt,
		);

		if (!isPasswordValid) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return { token: jwtToken, user: userObject };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { email } = userRequestDto;
		const userWithSameEmail = await this.userService.findByEmail(email);

		if (userWithSameEmail) {
			throw new AuthError({
				message: UserValidationMessage.EMAIL_TAKEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const user = await this.userService.create(userRequestDto);

		const userObject = user.toObject();

		const jwtToken = await token.createToken({ userId: userObject.id });

		return { token: jwtToken, user: userObject };
	}
}

export { AuthService };
