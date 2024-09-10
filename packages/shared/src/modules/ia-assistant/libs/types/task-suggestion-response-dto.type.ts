import { type TaskDto } from "../../../tasks/libs/types/types.js";

type SimplifiedTaskDto = Omit<
	TaskDto,
	"createdAt" | "id" | "updatedAt" | "userId"
>;

type TaskSuggestionsResponseDto = {
	tasks: SimplifiedTaskDto[];
	text: string;
	theadId: string;
};

export { type TaskSuggestionsResponseDto };
