import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { TasksApiPath } from "./libs/enums/enums";
import { type TaskDto } from "./libs/types/types";

class TasksApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.TASKS, storage });
	}

	public async getCurrentTasks(): Promise<TaskDto[]> {
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
