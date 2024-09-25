import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";
import {
	type TaskDto,
	type TaskNoteDto,
	type TaskNoteRequestDto,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/tasks.js";

import { TasksApiPath } from "./libs/enums/enums.js";

class TasksApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.TASKS, storage });
	}

	public async addNote(payload: TaskNoteRequestDto): Promise<TaskNoteDto> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.$ID_NOTES, {
				id: payload.taskId.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<TaskNoteDto>();
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

	public async getTaskNotes(id: number): Promise<TaskNoteDto[]> {
		const response = await this.load(
			this.getFullEndpoint(TasksApiPath.$ID_NOTES, { id: id.toString() }),
			{ contentType: ContentType.JSON, hasAuth: true, method: "GET" },
		);

		return await response.json<TaskNoteDto[]>();
	}

	public async update(
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
