import { type TaskCreateDto } from "./types.js";

type ButtonLabels = string[];

type Message = {
	buttonLabels?: ButtonLabels;
	lowestCategories?: Array<{
		categoryId: number;
		categoryName: string;
	}>;
	taskList?: TaskCreateDto[];
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
