import { TaskStatus } from "~/libs/enums/enums";
import { type TaskStatusStyle, type ValueOf } from "~/libs/types/types";

const getStatusProperties = (
	status: ValueOf<typeof TaskStatus>,
): null | TaskStatusStyle => {
	if (status === TaskStatus.SKIPPED) {
		return { label: "Skipped", type: "skip" };
	}

	if (status === TaskStatus.COMPLETED) {
		return { label: "Completed", type: "complete" };
	}

	return null;
};

export { getStatusProperties };
