import { Icon, QuizCategoriesForm } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";

import {
	CATEGORIES_SELECTOR_BUTTON_LABEL,
	CATEGORIES_SELECTOR_TEXT,
} from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const CategoriesSelector: React.FC = () => {
	const { quizCategories, threadId } = useAppSelector((state) => ({
		quizCategories: state.categories.items,
		threadId: state.chat.threadId,
	}));
	const dispatch = useAppDispatch();

	const handleCategoriesSubmit = useCallback(
		async (categoryIds: number[]): Promise<void> => {
			const newSelectedCategories = quizCategories
				.filter((category) => categoryIds.includes(category.id))
				.map((category) => ({
					id: category.id,
					name: category.name,
				}));

			dispatch(chatActions.updateSelectedCategories(newSelectedCategories));

			const taskPayload = {
				categories: newSelectedCategories,
				threadId: threadId ?? "",
			};

			await dispatch(chatActions.getTasksForCategories(taskPayload));
		},
		[dispatch, quizCategories, threadId],
	);

	const handleFormSubmit = useCallback(
		(categoryIds: number[]): void => {
			void handleCategoriesSubmit(categoryIds);
		},
		[handleCategoriesSubmit],
	);

	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<p>{CATEGORIES_SELECTOR_TEXT}</p>
				<div className={styles["content"]}>
					<QuizCategoriesForm
						buttonLabel={CATEGORIES_SELECTOR_BUTTON_LABEL}
						onSubmit={handleFormSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export { CategoriesSelector };
