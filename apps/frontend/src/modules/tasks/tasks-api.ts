import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { TasksApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class TasksApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.TASKS, storage });
	}

	public async getCurrentUsersTasks(): Promise<TaskDto[]> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.CURRENT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<TaskDto[]>();
	}
}

export { TasksApi };
