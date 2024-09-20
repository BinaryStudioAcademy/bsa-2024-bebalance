import { z } from "zod";

import {
	TaskNoteValidationMessage,
	TaskNoteValidationRule,
} from "../enums/enums.js";

type TaskNoteCreateRequestValidationDto = {
	content: z.ZodString;
	taskId: z.ZodNumber;
};

const taskNoteCreate = z
	.object<TaskNoteCreateRequestValidationDto>({
		content: z.string().min(TaskNoteValidationRule.TASK_NOTE_MIN_LENGTH, {
			message: TaskNoteValidationMessage.REQUIRED_CONTENT,
		}),
		taskId: z.number({
			invalid_type_error: TaskNoteValidationMessage.INVALID_TASK_ID,
			required_error: TaskNoteValidationMessage.REQUIRED_TASK_ID,
		}),
	})
	.required();

export { taskNoteCreate };
