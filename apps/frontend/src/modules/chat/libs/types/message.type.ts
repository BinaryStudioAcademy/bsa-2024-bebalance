import { type TaskDto } from "shared";

type ButtonLabels = string[];

type Message = {
	buttonLabels?: ButtonLabels;
	lowestCategories?: Array<{
		categoryId: number;
		categoryName: string;
		score: number;
	}>;
	messages: {
		comments: string;
		greeting: string;
	};
	taskList?: TaskDto[];
	threadId?: string;
	type: "categoryInputs" | "suggestionButtons" | "taskList" | "wheelAnalysis";
};

export { type Message };
