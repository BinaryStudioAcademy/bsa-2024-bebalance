import { ErrorMessage } from "~/libs/enums/enums.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type UserDto } from "~/modules/users/users.js";

import { type TaskService } from "../../task.service.js";
import { TaskError } from "../exceptions/exceptions.js";
import { type TaskNoteRequestDto } from "../types/types.js";

const checkNoteAccessToTask =
	(taskService: TaskService): APIPreHandler =>
	async (request) => {
		const { body, user } = request;

		const { taskId } = body as TaskNoteRequestDto;

		const task = await taskService.find(taskId);

		if ((user as UserDto).id !== task?.userId) {
			throw new TaskError({
				message: ErrorMessage.FORBIDDEN,
				status: HTTPCode.FORBIDDEN,
			});
		}
	};

export { checkNoteAccessToTask };
