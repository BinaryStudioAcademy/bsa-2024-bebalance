import { Button } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { type TaskCreateDto } from "~/modules/tasks/tasks.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL } from "../../constants/constants.js";
import { DislikeSuggestionMessage } from "../../enums/enums.js";

type Properties = {
	label: string;
	suggestion: TaskCreateDto;
	threadId: string;
};

const RegenerateSuggestionButton: React.FC<Properties> = ({
	label,
	suggestion,
	threadId,
}: Properties) => {
	const dispatch = useAppDispatch();

	const handleRegenerateSuggestion = useCallback(() => {
		dispatch(
			chatActions.addAssistantTextMessage(DislikeSuggestionMessage.MAIN),
		);
		dispatch(
			chatActions.addUserTextMessage(DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL),
		);
		dispatch(
			chatActions.addAssistantTextMessage(DislikeSuggestionMessage.WAIT),
		);
		dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));
		void dispatch(
			chatActions.changeTasksSuggestion({
				payload: [suggestion],
				threadId,
			}),
		);
	}, [dispatch, threadId, suggestion]);

	return (
		<Button
			label={label}
			onClick={handleRegenerateSuggestion}
			variant="secondary"
		/>
	);
};

export { RegenerateSuggestionButton };
