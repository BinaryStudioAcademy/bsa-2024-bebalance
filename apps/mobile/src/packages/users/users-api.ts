import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { UsersApiPath } from "./libs/enums/enums";
import { type UserGetAllResponseDto } from "./libs/types/types";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ path: APIPath.USERS, baseUrl, http, storage });
	}

	public async getAll(): Promise<UserGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				method: "GET",
				contentType: ContentType.JSON,
				hasAuth: false,
			}
		);

		return await response.json<UserGetAllResponseDto>();
	}
}

export { UserApi };
