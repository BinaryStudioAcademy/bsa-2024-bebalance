import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type TaskStatus } from "../enums/enums.js";

type TaskDto = {
	categoryId: number;
	categoryName: string;
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
