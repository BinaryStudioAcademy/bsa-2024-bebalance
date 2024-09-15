import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	actions as chatActions,
	// type TaskSuggestionRequestDto,
} from "~/modules/chat/chat.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import { ChatMessage } from "./libs/components/chat-message/chat-message.js";
import styles from "./styles.module.css";

const ChatComponent: React.FC = () => {
	const dispatch = useAppDispatch();

	const { scores } = useAppSelector((state) => state.quiz);
	const { quizCategories } = useAppSelector(({ categories }) => ({
		quizCategories: categories.items,
	}));
	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	});

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	const { messages, selectedCategories, threadId } = useAppSelector(
		({ chat }) => ({
			messages: chat.messages,
			selectedCategories: chat.selectedCategories,
			threadId: chat.threadId,
		}),
	);

	const formattedCategories = selectedCategories.map((category) => ({
		categoryId: category.categoryId.toString(),
		name: category.categoryName,

		// categoryName: category.categoryName,
	}));

	const contentData = {
		chartData,
		selectedCategories: {
			categories: formattedCategories,
			threadId: threadId ?? "",
		},
	};

	useEffect(() => {
		void dispatch(chatActions.initConversation());
	}, [dispatch]);

	const handleCategoriesSubmit = useCallback(
		(payload: { categoryIds: number[] }): void => {
			const newSelectedCategories = quizCategories
				.filter((category) => payload.categoryIds.includes(category.id))
				.map((category) => ({
					categoryId: category.id,
					categoryName: category.name,
					score: 0,
				}));
			dispatch(chatActions.updateSelectedCategories(newSelectedCategories));

			// const taskPayload: TaskSuggestionRequestDto = {
			// 	categories: newSelectedCategories,
			// 	threadId: threadId ?? "",
			// };

			// await dispatch(chatActions.getTasksForCategories(taskPayload));
		},
		// [dispatch, quizCategories, threadId],
		[dispatch, quizCategories],
	);

	return (
		<main className={styles["page-container"]}>
			<div>
				<ul className={styles["container"]}>
					{messages.map((message) => {
						return (
							<ChatMessage
								buttonLabels={message.buttonLabels ?? []}
								contentData={contentData}
								key={message.text}
								onFormSubmit={handleCategoriesSubmit}
								text={message.text}
								type={message.type}
							/>
						);
					})}
				</ul>
			</div>
		</main>
	);
};

export { ChatComponent };
