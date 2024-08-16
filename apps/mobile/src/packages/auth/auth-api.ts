import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import {
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
		super({ path: APIPath.AUTH, baseUrl, http, storage });
	}

	public async signUp(
		payload: UserSignUpRequestDto
	): Promise<UserSignUpResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				method: "POST",
				contentType: ContentType.JSON,
				payload: JSON.stringify(payload),
				hasAuth: false,
			}
		);

		return await response.json<UserSignUpResponseDto>();
	}
}

export { AuthApi };
