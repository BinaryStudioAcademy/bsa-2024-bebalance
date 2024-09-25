import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration, type UserDto } from "~/libs/types/types.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type NotificationAnswersPayloadDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";

class UsersApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
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

	public async saveNotificationAnswers(
		payload: NotificationAnswersPayloadDto,
	): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.NOTIFICATION_QUESTIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserDto>();
	}

	public async update(
		id: number,
		user: UserUpdateRequestDto,
	): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: id.toString() }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(user),
			},
		);

		return await response.json<UserDto>();
	}

	public async uploadAvatar(payload: FormData): Promise<UserDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.AVATAR, {}),
			{
				contentType: ContentType.MULTIPART_FORM_DATA,
				hasAuth: true,
				method: "POST",
				payload,
			},
		);

		return await response.json<UserDto>();
	}
}

export { UsersApi };
