import { z } from "zod";

import { type ValueOf } from "../../../../libs/types/types.js";
import {
	TaskStatus,
	TaskValidationMessage,
	TaskValidationRule,
} from "../enums/enums.js";

type TaskUpdateRequestValidationDto = {
	description: z.ZodString;
	label: z.ZodString;
	status: z.ZodEnum<[ValueOf<typeof TaskStatus>]>;
};

const taskUpdate = z
	.object<TaskUpdateRequestValidationDto>({
		description: z
			.string()
			.trim()
			.min(TaskValidationRule.DESCRIPTION_MIN_LENGTH, {
				message: TaskValidationMessage.DESCRIPTION_MIN_LENGTH,
			}),
		label: z.string().trim().min(TaskValidationRule.LABEL_MIN_LENGTH, {
			message: TaskValidationMessage.LABEL_MIN_LENGTH,
		}),
		status: z.enum(Object.values(TaskStatus) as [ValueOf<typeof TaskStatus>], {
			errorMap: () => ({
				message: TaskValidationMessage.INVALID_STATUS,
			}),
		}),
	})
	.partial()
	.refine((data) => Object.values(data).some((value) => value !== undefined), {
		message: TaskValidationMessage.DATA_REQUIRED,
	});

export { taskUpdate };
