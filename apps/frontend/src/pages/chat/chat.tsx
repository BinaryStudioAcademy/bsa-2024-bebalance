import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
} from "~/libs/hooks/hooks.js";
import {
	actions as chatActions,
	type TaskSuggestionRequestDto,
} from "~/modules/chat/chat.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import {
	ChatMessage,
	InitialMessages,
	MessageLoader,
} from "./libs/components/components.js";
import { type ChartDataType } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();

	const {
		messages,
		messageStatus,
		quizCategories,
		scores,
		selectedCategories,
		threadId,
	} = useAppSelector((state) => ({
		messages: state.chat.messages,
		messageStatus: state.chat.dataStatus,
		quizCategories: state.categories.items,
		scores: state.quiz.scores,
		selectedCategories: state.chat.selectedCategories,
		threadId: state.chat.threadId,
	}));

	const chartData = scores.map((score) => {
		return {
			data: score.score,
			label: score.categoryName,
		};
	}) as ChartDataType[];

	const formattedCategories = selectedCategories.map((category) => {
		return {
			categoryId: category.categoryId,
			categoryName: category.categoryName,
		};
	});

	const contentData = useMemo(
		() => ({
			chartData,
			selectedCategories: formattedCategories,
		}),
		[chartData, formattedCategories],
	);

	useEffect(() => {
		void dispatch(quizActions.getScores());
		void dispatch(chatActions.initConversation());
	}, [dispatch]);

	const handleCategoriesSubmit = useCallback(
		async (categoryIds: number[]): Promise<void> => {
			const newSelectedCategories = quizCategories
				.filter((category) => categoryIds.includes(category.id))
				.map((category) => ({
					categoryId: category.id,
					categoryName: category.name,
				}));

			dispatch(chatActions.updateSelectedCategories(newSelectedCategories));

			const taskPayload: TaskSuggestionRequestDto = {
				categories: newSelectedCategories,
				threadId: threadId ?? "",
			};

			await dispatch(chatActions.getTasksForCategories(taskPayload));
		},
		[dispatch, quizCategories, threadId],
	);

	const handleFormSubmitWrapper = useCallback(
		(categoryIds: number[]): void => {
			void handleCategoriesSubmit(categoryIds);
		},
		[handleCategoriesSubmit],
	);

	return (
		<main className={styles["page-container"]}>
			<div>
				<ul className={styles["container"]}>
					{threadId && <InitialMessages />}
					{messages.map((message) => {
						return (
							<ChatMessage
								buttonLabels={message.buttonLabels ?? []}
								contentData={contentData}
								key={message.message}
								onFormSubmit={handleFormSubmitWrapper}
								// taskList={message.tasks ?? []}
								text={message.message}
								type={message.type}
							/>
						);
					})}
					{messageStatus === DataStatus.PENDING && <MessageLoader />}
				</ul>
			</div>
		</main>
	);
};

export { Chat };
