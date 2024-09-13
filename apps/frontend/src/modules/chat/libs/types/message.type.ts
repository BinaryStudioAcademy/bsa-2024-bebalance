import { type TaskDto } from "shared";

type ButtonLabels = string[];

type Message = {
	buttonLabels?: ButtonLabels;
	lowestCategories?: Array<{
		categoryId: number;
		categoryName: string;
		score: number;
	}>;
	taskList?: TaskDto[];
	text: string;
	threadId?: string;
	type:
		| "categoryInputs"
		| "suggestionButtons"
		| "taskList"
		| "text"
		| "wheelAnalysis";
};

export { type Message };
