import { Button, Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { ButtonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL } from "./libs/constants/constants.js";
import { DislikeSuggestionMessage } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const DislikeSuggestionsOptions: React.FC = () => {
	const { taskSuggestions, threadId } = useAppSelector((state) => ({
		taskSuggestions: state.chat.taskSuggestions,
		threadId: state.chat.threadId,
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
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);
	}, [dispatch, threadId, taskSuggestions]);

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
					</div>
				</div>
			</div>
		</div>
	);
};

export { DislikeSuggestionsOptions };
