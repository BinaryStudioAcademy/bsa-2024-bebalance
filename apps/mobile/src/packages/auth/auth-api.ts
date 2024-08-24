import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import {
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "../users/users";
import { AuthApiPath } from "./libs/enums/enums";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
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

		return await response.json<UserSignInResponseDto>();
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
