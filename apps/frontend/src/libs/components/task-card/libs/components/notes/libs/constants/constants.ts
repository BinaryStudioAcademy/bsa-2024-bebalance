import { type TaskNoteRequestDto } from "~/modules/tasks/tasks.js";

const DEFAULT_TASK_NOTE_PAYLOAD: Omit<TaskNoteRequestDto, "taskId"> = {
	content: "",
};

export { DEFAULT_TASK_NOTE_PAYLOAD };
