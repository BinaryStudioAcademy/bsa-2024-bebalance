import { type AppDispatch } from "~/libs/hooks/hooks.js";
import { type TaskSuggestionRequestDto } from "~/modules/chat/chat.js";
import { actions as chatActions } from "~/modules/chat/chat.js";

type ActionType = "getCategoryForm" | "getTasks";

const handleButtonAction = async (
	dispatch: AppDispatch,
	actionType: ActionType,
	payload?: TaskSuggestionRequestDto,
): Promise<void> => {
	switch (actionType) {
		case "getCategoryForm": {
			dispatch(chatActions.addCategoryCheckboxMessage());
			break;
		}

		case "getTasks": {
			await dispatch(
				chatActions.getTasksForCategories(payload as TaskSuggestionRequestDto),
			);
			break;
		}
	}
};

export { handleButtonAction };
