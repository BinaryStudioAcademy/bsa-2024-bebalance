import { Button, Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import {
	SuggestionsManipulationButtonLabel,
	SuggestionsManipulationMessage,
} from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	isExplained?: boolean;
};

const SuggestionsManipulationOptions: React.FC<Properties> = ({
	isExplained,
}: Properties) => {
	const { taskSuggestions, threadId } = useAppSelector((state) => ({
		selectedCategories: state.chat.selectedCategories,
		taskSuggestions: state.chat.taskSuggestions,
		threadId: state.chat.threadId,
	}));
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
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);
	}, [dispatch, taskSuggestions, threadId]);

	const handleExplainTasksSuggestions = useCallback(() => {
		void dispatch(
			chatActions.addUserTextMessage(
				SuggestionsManipulationButtonLabel.EXPLAIN_TASKS,
			),
		);

		void dispatch(
			chatActions.explainTasksSuggestions({
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);

		void dispatch(
			chatActions.setButtonsMode(ButtonsModeOption.SUGGESTIONS_EXPLANATION),
		);
	}, [dispatch, taskSuggestions, threadId]);

	const handleDislikeSuggestions = useCallback(() => {
		void dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));

		void dispatch(
			chatActions.addAssistantTextMessage(
				SuggestionsManipulationMessage.MAIN_MESSAGE,
			),
		);
		void dispatch(
			chatActions.addUserTextMessage(
				SuggestionsManipulationButtonLabel.DISLIKE_TASKS,
			),
		);
		void dispatch(
			chatActions.setButtonsMode(ButtonsModeOption.DISLIKE_SUGGESTIONS),
		);
	}, [dispatch]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{SuggestionsManipulationMessage.MAIN_MESSAGE}</p>
					<br />
					<div className={styles["button-container"]}>
						<Button
							label={SuggestionsManipulationButtonLabel.ACCEPT_TASKS}
							onClick={handleAcceptAllSuggestions}
							variant="secondary"
						/>
						{isExplained && (
							<Button
								label={SuggestionsManipulationButtonLabel.EXPLAIN_TASKS}
								onClick={handleExplainTasksSuggestions}
								variant="secondary"
							/>
						)}

						<Button
							label={SuggestionsManipulationButtonLabel.DISLIKE_TASKS}
							onClick={handleDislikeSuggestions}
							variant="secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SuggestionsManipulationOptions };
