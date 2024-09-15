import { type TaskDto } from "../../../tasks/libs/types/types.js";

type SimplifiedTaskDto = Omit<
	TaskDto,
	"createdAt" | "id" | "status" | "updatedAt" | "userId"
>;

type TaskSuggestionsResponseDto = {
	message: string;
	tasks: SimplifiedTaskDto[];
};

export { type SimplifiedTaskDto, type TaskSuggestionsResponseDto };
