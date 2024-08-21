import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { UsersApiPath } from "./libs/enums/enums";
import {
	type UserGetAllItemResponseDto,
	type UserGetAllResponseDto,
} from "./libs/types/types";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getAll(): Promise<UserGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "GET",
			},
		);

		return await response.json<UserGetAllResponseDto>();
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<UserGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.AUTHENTICATED_USER, {
				id: userId.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserGetAllItemResponseDto>();
	}
}

export { UserApi };
