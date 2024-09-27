import { Button, Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	actions as chatActions,
	ChatMessageAuthor,
} from "~/modules/chat/chat.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import {
	SuggestionsManipulationButtonLabel,
	SuggestionsManipulationMessage,
} from "../suggestions-manipulation-options/libs/enums/enums.js";
import { RegenerateSuggestionButton } from "./libs/components/components.js";
import { DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL } from "./libs/constants/constants.js";
import { DislikeSuggestionMessage } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const DislikeSuggestionsOptions: React.FC = () => {
	const { taskSuggestions } = useAppSelector((state) => ({
		taskSuggestions: state.chat.taskSuggestions,
	}));
	const dispatch = useAppDispatch();

	const handleRegenerateAllSuggestions = useCallback(() => {
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
				APIPayload: {
					messages: [
						{
							author: ChatMessageAuthor.ASSISTANT,
							text: SuggestionsManipulationMessage.MAIN_MESSAGE,
						},
						{
							author: ChatMessageAuthor.USER,
							text: SuggestionsManipulationButtonLabel.DISLIKE_TASKS,
						},
						{
							author: ChatMessageAuthor.ASSISTANT,
							text: DislikeSuggestionMessage.MAIN,
						},
						{
							author: ChatMessageAuthor.USER,
							text: DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL,
						},
						{
							author: ChatMessageAuthor.ASSISTANT,
							text: DislikeSuggestionMessage.WAIT,
						},
					],
					tasks: taskSuggestions,
				},
			}),
		);
	}, [dispatch, taskSuggestions]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{DislikeSuggestionMessage.MAIN}</p>
					<div className={styles["button-container"]}>
						<Button
							label={DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL}
							onClick={handleRegenerateAllSuggestions}
							variant="secondary"
						/>
						{taskSuggestions.map((suggestion) => {
							return (
								<RegenerateSuggestionButton
									key={suggestion.categoryId}
									label={`${suggestion.categoryName} sector task`}
									oldSuggestions={taskSuggestions}
									suggestion={suggestion}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export { DislikeSuggestionsOptions };
