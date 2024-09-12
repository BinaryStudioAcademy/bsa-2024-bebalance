import { type ValueOf } from "../../../../libs/types/types.js";
import { type TaskStatus } from "../enums/enums.js";

type TaskDto = {
	category: string;
	categoryId: number;
	createdAt: string;
	description: string;
	dueDate: string;
	id: number;
	label: string;
	status: ValueOf<typeof TaskStatus>;
	updatedAt: string;
	userId: number;
};

export { type TaskDto };
