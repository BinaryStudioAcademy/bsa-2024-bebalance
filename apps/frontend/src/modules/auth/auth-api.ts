import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import {
	type EmailDto,
	type ResetPasswordDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async getAuthenticatedUser(): Promise<null | UserDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.AUTHENTICATED_USER, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<null | UserDto>();
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

	public async resetPassword(
		payload: ResetPasswordDto,
	): Promise<UserSignInResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.RESET_PASSWORD, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserSignInResponseDto>();
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
}

export { AuthApi };
