import { Button, Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import {
	suggestionsManipulationButtonLabel,
	suggestionsManipulationMessages,
} from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const SuggestionsManipulationOptions: React.FC = () => {
	const { taskSuggestions, threadId } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();
	const handleAcceptAllSuggestions = useCallback(() => {
		void dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));

		void dispatch(
			chatActions.addAssistantTextMessage(
				suggestionsManipulationMessages.MAIN_MESSAGE,
			),
		);
		void dispatch(
			chatActions.addUserTextMessage(
				suggestionsManipulationButtonLabel.acceptTasks,
			),
		);
		void dispatch(
			chatActions.addAssistantTextMessage(
				suggestionsManipulationMessages.ACCEPT_TASKS_RESPONSE,
			),
		);

		void dispatch(
			chatActions.createTasksFromSuggestions({
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);
	}, [dispatch, taskSuggestions, threadId]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{suggestionsManipulationMessages.MAIN_MESSAGE}</p>
					<div className={styles["button-container"]}>
						<Button
							label={suggestionsManipulationButtonLabel.acceptTasks}
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
