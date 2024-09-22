import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import {
	ButtonsController,
	ChatMessage,
	InitialMessages,
	MessageLoader,
} from "./libs/components/components.js";
import styles from "./styles.module.css";

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();

	const { messages, messageStatus, threadId } = useAppSelector((state) => ({
		messages: state.chat.messages,
		messageStatus: state.chat.dataStatus,
		quizCategories: state.categories.items,
		scores: state.quiz.scores,
		selectedCategories: state.chat.selectedCategories,
		threadId: state.chat.threadId,
	}));

	useEffect(() => {
		void dispatch(quizActions.getScores());
		void dispatch(chatActions.initConversation());
	}, [dispatch]);

	return (
		<main className={styles["page-container"]}>
			<div>
				<ul className={styles["container"]}>
					{threadId && <InitialMessages />}
					{messages.map((message, index) => {
						return (
							<ChatMessage
								author={message.author}
								key={index}
								payload={message.payload}
								type={message.type}
							/>
						);
					})}

					{threadId && <ButtonsController />}
					{messageStatus === DataStatus.PENDING && <MessageLoader />}
				</ul>
			</div>
		</main>
	);
};

export { Chat };
