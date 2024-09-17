import { TaskStatus } from "./task-status.enum.js";
import { TaskValidationRule } from "./task-validation-rule.enum.js";

const TaskValidationMessage = {
	DATA_REQUIRED: "At least one field must be provided.",
	DESCRIPTION_MIN_LENGTH: `Description must be at least ${String(
		TaskValidationRule.DESCRIPTION_MIN_LENGTH,
	)} characters long.`,
	INVALID_STATUS: `Invalid status. Status must be one of: ${Object.values(TaskStatus).join(", ")}.`,
	LABEL_MIN_LENGTH: `Label must be at least ${String(
		TaskValidationRule.LABEL_MIN_LENGTH,
	)} characters long.`,
} as const;

export { TaskValidationMessage };
