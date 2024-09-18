import { ErrorMessage } from "~/libs/enums/enums.js";
import { JWTExpired } from "~/libs/exceptions/exceptions.js";
import { config } from "~/libs/modules/config/config.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { mailer } from "~/libs/modules/mailer/mailer.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type EmailDto,
	type ResetPasswordDto,
	type ResetPasswordLinkDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type UserUpdatePasswordRequestDto,
} from "~/modules/users/libs/types/types.js";
import { type UserEntity } from "~/modules/users/user.entity.js";
import { type UserService } from "~/modules/users/user.service.js";

import { HTTPCode, UserValidationMessage } from "./libs/enums/enums.js";
import { AuthError } from "./libs/exceptions/exceptions.js";
import { createResetPasswordEmail } from "./libs/helpers/helpers.js";

type Constructor = {
	encrypt: Encrypt;
	resetPasswordLinkDuration: string;
	sessionDuration: string;
	userService: UserService;
};

class AuthService {
	private encrypt: Encrypt;
	private resetPasswordLinkDuration: string;
	private sessionDuration: string;
	private userService: UserService;

	public constructor({
		encrypt,
		resetPasswordLinkDuration,
		sessionDuration,
		userService,
	}: Constructor) {
		this.userService = userService;
		this.encrypt = encrypt;
		this.sessionDuration = sessionDuration;
		this.resetPasswordLinkDuration = resetPasswordLinkDuration;
	}

	private async checkIsPasswordValid(
		currentPassword: string,
		user: UserEntity,
	): Promise<boolean> {
		const { passwordHash, passwordSalt } = user.toNewObject();

		return await this.encrypt.compare(
			currentPassword,
			passwordHash,
			passwordSalt,
		);
	}

	public async checkIsResetPasswordExpired(
		query: ResetPasswordLinkDto,
	): Promise<boolean> {
		try {
			await token.decode(query.token);

			return true;
		} catch (error) {
			if (error instanceof JWTExpired) {
				throw new AuthError({
					message: ErrorMessage.RESET_PASSWORD_LINK_EXPIRED,
				});
			}

			throw error;
		}
	}

	public async forgotPassword(payload: EmailDto): Promise<boolean> {
		const { email: targetEmail } = payload;

		const user = await this.userService.findByEmail(targetEmail);

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.EMAIL_NOT_FOUND,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const userDetails = user.toObject();

		const jwtToken = await token.createToken({
			expirationTime: this.resetPasswordLinkDuration,
			payload: { userId: userDetails.id },
		});

		mailer.sendEmail({
			subject: "BeBalance: reset password",
			text: createResetPasswordEmail({
				link: `${config.ENV.BASE_URLS.RESET_PASSWORD_URL}?token=${jwtToken}`,
				username: userDetails.name,
			}),
			to: userDetails.email,
		});

		return true;
	}

	public async resetPassword(payload: ResetPasswordDto): Promise<boolean> {
		const { jwtToken, newPassword } = payload;

		const {
			payload: { userId },
		} = await token.decode(jwtToken);

		const user = await this.userService.find(userId);

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		await this.userService.changePassword(userId, newPassword);

		return true;
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

		const jwtToken = await token.createToken({
			expirationTime: this.sessionDuration,
			payload: { userId: userDetails.id },
		});

		const isPasswordValid = await this.checkIsPasswordValid(password, user);

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

		const jwtToken = await token.createToken({
			expirationTime: this.sessionDuration,
			payload: { userId: user.id },
		});

		return { token: jwtToken, user };
	}

	public async updatePassword(
		payload: UserUpdatePasswordRequestDto,
		email: string,
	): Promise<null | UserDto> {
		const { currentPassword, newPassword } = payload;
		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const userId = user.toObject().id;
		const isPasswordValid = await this.checkIsPasswordValid(
			currentPassword,
			user,
		);

		if (!isPasswordValid) {
			throw new AuthError({
				message: ErrorMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return await this.userService.changePassword(userId, newPassword);
	}
}

export { AuthService };
