import { z } from "zod";

import { TaskStatus, TaskValidationMessage } from "../enums/enums.js";

type TaskUpdateRequestValidationDto = {
	status: z.ZodEnum<
		[
			typeof TaskStatus.COMPLETED,
			typeof TaskStatus.CURRENT,
			typeof TaskStatus.SKIPPED,
		]
	>;
};

const taskUpdate = z
	.object<TaskUpdateRequestValidationDto>({
		status: z.enum(
			[TaskStatus.COMPLETED, TaskStatus.CURRENT, TaskStatus.SKIPPED],
			{
				invalid_type_error: TaskValidationMessage.INVALID_TYPE,
				required_error: TaskValidationMessage.REQUIRED,
			},
		),
	})
	.required();

export { taskUpdate };
