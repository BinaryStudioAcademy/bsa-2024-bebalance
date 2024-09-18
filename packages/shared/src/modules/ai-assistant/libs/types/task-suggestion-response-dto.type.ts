import { type TaskCreateDto } from "../../../tasks/libs/types/types.js";

type TaskSuggestionsResponseDto = {
	message: string;
	tasks: TaskCreateDto[];
};

export { type TaskSuggestionsResponseDto };
