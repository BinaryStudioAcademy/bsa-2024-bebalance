import { Button } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { type TaskCreateDto } from "~/modules/tasks/tasks.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { DislikeSuggestionMessage } from "../../enums/enums.js";

type Properties = {
	label: string;
	oldSuggestions: TaskCreateDto[];
	suggestion: TaskCreateDto;
};

const RegenerateSuggestionButton: React.FC<Properties> = ({
	label,
	oldSuggestions,
	suggestion,
}: Properties) => {
	const dispatch = useAppDispatch();

	const handleRegenerateSuggestion = useCallback(() => {
		dispatch(
			chatActions.addAssistantTextMessage(DislikeSuggestionMessage.MAIN),
		);
		dispatch(chatActions.addUserTextMessage(label));
		dispatch(
			chatActions.addAssistantTextMessage(DislikeSuggestionMessage.WAIT),
		);
		dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));
		void dispatch(
			chatActions.changeTasksSuggestion({
				APIPayload: { messages: [], tasks: [suggestion] },
				oldSuggestions,
			}),
		);
	}, [dispatch, label, suggestion, oldSuggestions]);

	return (
		<Button
			label={label}
			onClick={handleRegenerateSuggestion}
			variant="secondary"
		/>
	);
};

export { RegenerateSuggestionButton };
