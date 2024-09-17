import { type AppDispatch } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	actions as chatActions,
	type TaskSuggestionRequestDto,
} from "~/modules/chat/chat.js";

import { ChatButtonAction } from "../enums/enums.js";

const handleButtonAction = async (
	dispatch: AppDispatch,
	actionType: ValueOf<typeof ChatButtonAction>,
	payload?: TaskSuggestionRequestDto,
): Promise<void> => {
	switch (actionType) {
		case ChatButtonAction.GET_CATEGORY_FORM: {
			dispatch(chatActions.addCategoryCheckboxMessage());
			break;
		}

		case ChatButtonAction.GET_TASKS: {
			await dispatch(
				chatActions.getTasksForCategories(payload as TaskSuggestionRequestDto),
			);
			break;
		}
	}
};

export { handleButtonAction };
