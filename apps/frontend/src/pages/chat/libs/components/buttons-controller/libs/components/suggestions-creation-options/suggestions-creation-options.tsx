import { Button, Icon } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { buttonsModeOption } from "~/pages/chat/libs/enums/enums.js";

import { SUGGESTIONS_CREATION_TEXT } from "./libs/constants/constants.js";
import { suggestionsCreationButtonLabel } from "./libs/enums/enums.js";
import { getThreeLowestScores } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const SuggestionsCreationOptions: React.FC = () => {
	const { scores, threadId } = useAppSelector((state) => ({
		scores: state.quiz.scores,
		threadId: state.chat.threadId,
	}));
	const dispatch = useAppDispatch();

	const handleNo = useCallback(() => {
		dispatch(chatActions.addAssistantTextMessage(SUGGESTIONS_CREATION_TEXT));
		dispatch(chatActions.addUserTextMessage(suggestionsCreationButtonLabel.NO));
		dispatch(chatActions.setButtonsMode(buttonsModeOption.CATEGORIES_CHECKBOX));
	}, [dispatch]);

	const handleYes = useCallback(() => {
		const threeLowestScores = getThreeLowestScores(scores);
		const selectedCategories = threeLowestScores.map((score) => {
			return {
				id: score.categoryId,
				name: score.categoryName,
			};
		});

		dispatch(chatActions.setButtonsMode(buttonsModeOption.NONE));
		dispatch(chatActions.addAssistantTextMessage(SUGGESTIONS_CREATION_TEXT));
		dispatch(
			chatActions.addUserTextMessage(suggestionsCreationButtonLabel.YES),
		);

		void dispatch(
			chatActions.getTasksForCategories({
				categories: selectedCategories,
				threadId: threadId as string,
			}),
		);
	}, [dispatch, scores, threadId]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{SUGGESTIONS_CREATION_TEXT}</p>
					<div className={styles["button-container"]}>
						<Button
							label={suggestionsCreationButtonLabel.YES}
							onClick={handleYes}
							variant="secondary"
						/>
						<Button
							label={suggestionsCreationButtonLabel.NO}
							onClick={handleNo}
							variant="secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SuggestionsCreationOptions };
