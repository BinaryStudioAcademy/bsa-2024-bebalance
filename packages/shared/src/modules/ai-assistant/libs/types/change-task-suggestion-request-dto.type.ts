import { type TaskCreateDto } from "../../../tasks/libs/types/types.js";

type ChangeTaskSuggestionRequestDto = {
	task: TaskCreateDto;
	threadId: string;
};

export { type ChangeTaskSuggestionRequestDto };
