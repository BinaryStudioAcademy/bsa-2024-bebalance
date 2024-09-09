import { APIPath, ContentType } from "~/libs/enums/enums";
import { type ApiConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { UsersApiPath } from "./libs/enums/enums";
import { type UserDto } from "./libs/types/types";

class UserApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: ApiConfiguration) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getById(id: number): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: id.toString() }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserDto>();
	}
}

export { UserApi };
