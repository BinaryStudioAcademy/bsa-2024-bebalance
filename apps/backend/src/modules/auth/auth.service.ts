import { ErrorMessage } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { mail } from "~/libs/modules/mail/mail.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type EmailDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { HTTPCode, UserValidationMessage } from "./libs/enums/enums.js";
import { AuthError } from "./libs/exceptions/exceptions.js";

class AuthService {
	private encrypt: Encrypt;
	private userService: UserService;

	public constructor(userService: UserService, encrypt: Encrypt) {
		this.userService = userService;
		this.encrypt = encrypt;
	}

	public async forgotPassword(payload: EmailDto): Promise<string> {
		const { email: targetEmail } = payload;

		const user = await this.userService.findByEmail(targetEmail);

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const userDetails = user.toObject();

		const jwtToken = await token.createToken({
			email: userDetails.email,
			userId: userDetails.id,
		});

		const link = `http://${config.ENV.APP.HOST}:3000/reset-password/${userDetails.id.toString()}/${jwtToken}`;

		mail.sendResetPasswordEmail({
			recipient: userDetails.email,
			resetLink: link,
		});

		return "Email sent";
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

		const userDetails = user.toObject();

		const jwtToken = await token.createToken({ userId: userDetails.id });

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

		return { token: jwtToken, user: userDetails };
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

		const jwtToken = await token.createToken({ userId: user.id });

		return { token: jwtToken, user };
	}
}

export { AuthService };
