import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { TasksApi } from "./tasks-api";

const tasksApi = new TasksApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { tasksApi };
export {
	type TaskDto,
	type TaskUpdatePayload,
	type TaskUpdateRequestDto,
} from "./libs/types/types";
