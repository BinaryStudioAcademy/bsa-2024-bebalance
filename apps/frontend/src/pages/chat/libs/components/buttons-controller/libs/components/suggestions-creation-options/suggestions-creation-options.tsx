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

import { SUGGESTIONS_CREATION_TEXT } from "./libs/constants/constants.js";
import { SuggestionsCreationButtonLabel } from "./libs/enums/enums.js";
import { getCategoriesWithThreeLowestScores } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const SuggestionsCreationOptions: React.FC = () => {
	const { scores } = useAppSelector((state) => ({
		scores: state.quiz.scores,
	}));
	const dispatch = useAppDispatch();

	const handleDisplayCategoryCheckbox = useCallback(() => {
		dispatch(chatActions.addAssistantTextMessage(SUGGESTIONS_CREATION_TEXT));
		dispatch(chatActions.addUserTextMessage(SuggestionsCreationButtonLabel.NO));
		dispatch(chatActions.setButtonsMode(ButtonsModeOption.CATEGORIES_CHECKBOX));
	}, [dispatch]);

	const handleCreationForThreeLowest = useCallback(() => {
		const threeLowestScores = getCategoriesWithThreeLowestScores(scores);
		const selectedCategories = threeLowestScores.map((score) => {
			return {
				id: score.categoryId,
				name: score.categoryName,
			};
		});

		dispatch(chatActions.setButtonsMode(ButtonsModeOption.NONE));
		dispatch(chatActions.addAssistantTextMessage(SUGGESTIONS_CREATION_TEXT));
		dispatch(
			chatActions.addUserTextMessage(SuggestionsCreationButtonLabel.YES),
		);

		void dispatch(
			chatActions.getTasksForCategories({
				categories: selectedCategories,
				messages: [
					{
						author: ChatMessageAuthor.ASSISTANT,
						text: SUGGESTIONS_CREATION_TEXT,
					},
					{
						author: ChatMessageAuthor.USER,
						text: SuggestionsCreationButtonLabel.YES,
					},
				],
			}),
		);
	}, [dispatch, scores]);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{SUGGESTIONS_CREATION_TEXT}</p>
					<div className={styles["button-container"]}>
						<Button
							label={SuggestionsCreationButtonLabel.YES}
							onClick={handleCreationForThreeLowest}
							variant="secondary"
						/>
						<Button
							label={SuggestionsCreationButtonLabel.NO}
							onClick={handleDisplayCategoryCheckbox}
							variant="secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SuggestionsCreationOptions };
