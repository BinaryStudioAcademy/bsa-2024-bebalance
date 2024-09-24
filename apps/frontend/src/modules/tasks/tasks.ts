import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { TasksApi } from "./tasks-api.js";

const tasksApi = new TasksApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { tasksApi };
export {
	type TaskCreateDto,
	type TaskDto,
	type TaskNoteDto,
	type TaskNoteParametersDto,
	type TaskNoteRequestDto,
	type TaskUpdatePayload,
	type TaskUpdateRequestDto,
} from "./libs/types/types.js";
export { taskNoteValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/tasks.js";
