import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";
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
} from "~/modules/users/users.js";

import { AuthApiPath } from "./libs/enums/enums.js";

class AuthApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async checkIsResetPasswordExpired(
		payload: ResetPasswordLinkDto,
	): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(
				`${AuthApiPath.CHECK_RESET_PASSWORD_EXPIRATION}?token=${payload.token}`,
				{},
			),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "GET",
			},
		);

		return await response.json<boolean>();
	}

	public async getAuthenticatedUser(): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.AUTHENTICATED_USER, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserDto>();
	}

	public async requestResetPassword(payload: EmailDto): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.FORGOT_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<boolean>();
	}

	public async resetPassword(payload: ResetPasswordDto): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.RESET_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<boolean>();
	}

	public async signIn(
		payload: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}

	public async signUp(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignUpResponseDto>();
	}

	public async updatePassword(
		payload: UserUpdatePasswordRequestDto,
	): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.UPDATE_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserDto>();
	}
}

export { AuthApi };
