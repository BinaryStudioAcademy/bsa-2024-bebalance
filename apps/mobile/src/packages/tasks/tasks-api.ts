import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { TasksApiPath } from "./libs/enums/enums";
import { type TaskDto, type TaskUpdateRequestDto } from "./libs/types/types";

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

	public async getPastTasks(): Promise<TaskDto[]> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.PAST, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<TaskDto[]>();
	}

	public async updateTask(
		id: number,
		task: Partial<TaskUpdateRequestDto>,
	): Promise<TaskDto> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.$ID, { id: id.toString() }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(task),
			},
		);

		return await response.json<TaskDto>();
	}

	public async updateTaskDeadline(id: number): Promise<TaskDto> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.$ID_DEADLINE, {
				id: id.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify({}),
			},
		);

		return await response.json<TaskDto>();
	}
}

export { TasksApi };
