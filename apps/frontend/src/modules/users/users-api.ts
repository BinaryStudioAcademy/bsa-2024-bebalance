import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type UserDto } from "~/libs/types/types.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserPreferencesRequestDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UsersApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async saveUserPreferences(
		payload: UserPreferencesRequestDto,
	): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.FINAL_QUESTIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserDto>();
	}
}

export { UsersApi };
