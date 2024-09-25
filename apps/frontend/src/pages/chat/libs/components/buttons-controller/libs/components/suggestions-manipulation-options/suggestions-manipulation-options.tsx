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
} from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const SuggestionsManipulationOptions: React.FC = () => {
	const { taskSuggestions } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();
	const handleAcceptAllSuggestions = useCallback(() => {
		void dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));

		void dispatch(
			chatActions.addAssistantTextMessage(
				SuggestionsManipulationMessage.MAIN_MESSAGE,
			),
		);
		void dispatch(
			chatActions.addUserTextMessage(
				SuggestionsManipulationButtonLabel.ACCEPT_TASKS,
			),
		);
		void dispatch(
			chatActions.addAssistantTextMessage(
				SuggestionsManipulationMessage.ACCEPT_TASKS_RESPONSE,
			),
		);

		void dispatch(
			chatActions.createTasksFromSuggestions({
				messages: [
					{
						author: ChatMessageAuthor.USER,
						text: SuggestionsManipulationButtonLabel.ACCEPT_TASKS,
					},
					{
						author: ChatMessageAuthor.ASSISTANT,
						text: SuggestionsManipulationMessage.ACCEPT_TASKS_RESPONSE,
					},
				],
				payload: taskSuggestions,
			}),
		);
	}, [dispatch, taskSuggestions]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{SuggestionsManipulationMessage.MAIN_MESSAGE}</p>
					<div className={styles["button-container"]}>
						<Button
							label={SuggestionsManipulationButtonLabel.ACCEPT_TASKS}
							onClick={handleAcceptAllSuggestions}
							variant="secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SuggestionsManipulationOptions };
