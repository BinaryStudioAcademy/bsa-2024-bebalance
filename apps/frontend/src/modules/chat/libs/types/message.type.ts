import { type SimplifiedTaskDto } from "./types.js";

type ButtonLabels = string[];

type Message = {
	buttonLabels?: ButtonLabels;
	lowestCategories?: Array<{
		categoryId: number;
		categoryName: string;
	}>;
	taskList?: SimplifiedTaskDto[];
	text: string;
	threadId?: string;
	type:
		| "categoryForm"
		| "confirmationButtons"
		| "taskList"
		| "text"
		| "wheelAnalysis";
};

export { type Message };
