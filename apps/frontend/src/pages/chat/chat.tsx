import {
	useAppDispatch,
	// useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as chatActions } from "~/modules/chat/chat.js";

import { UserWheel } from "../root/components/components.js";
import styles from "./styles.module.css";

const ChatComponent: React.FC = () => {
	const dispatch = useAppDispatch();

	// const { selectedCategories, threadId } = useAppSelector(({ chat }) => ({
	// 	selectedCategories: chat.selectedCategories,
	// 	// messages: chat.messages,
	// 	threadId: chat.threadId,
	// }));
	const messages = [
		{
			text: "Hello, Julia! I appreciate you sharing your insights about your life areas through the Wheel of Balance. Here's a quick summary of your scores: - **Physical**: 10 (Great satisfaction!) - **Work**: 4 (Room for improvement) - **Friends**: 3 (Needs attention) - **Love**: 6 (Moderately satisfied) - **Money**: 7 (Fairly satisfied) - **Free time**: 5 (Average satisfaction) - **Spiritual**: 6 (Moderately satisfied) - **Mental**: 5 (Average satisfaction) From your scores, it seems that areas you might want to focus on for improvement are: 1. **Friends** (score: 3) 2. **Work** (score: 4) 3. **Free Time** (score: 5) These categories are where you rated the lowest, suggesting they might benefit from your attention and efforts. Now, I am here to support you!",
			threadId: "thread_yUq8ZOtYGNqXEiCyKhKsEwUT",
			type: "wheelAnalys",
		},
		{
			buttonLabels: ["✅ Yes, 3 lowest", "🚫 No smth else"],
			text: "How would you like to proceed with improving your balance? Do you want to work on 3 fields, with the lowest score, or you want to choose the fields yourself to work on?",
			type: "suggestionButtons",
		},
		{
			lowestCategories: [
				{ categoryId: 3, categoryName: "Friends", score: 3 },
				{ categoryId: 2, categoryName: "Work", score: 4 },
				{ categoryId: 6, categoryName: "Free time", score: 5 },
			],
			text: "Choose the fields yourself to work on?",
			type: "categoryInputs",
		},
		{
			buttonLabels: [
				"Everything is clear",
				"Give me more info",
				"I don't like this tasks",
			],
			taskList: [{}, {}, {}],
			text: "Here is your task list",
			type: "taskList",
		},
	];

	useEffect(() => {
		void dispatch(chatActions.initConversation());
	}, [dispatch]);

	return (
		<div>
			<ul className={styles["container"]}>
				{messages.map((mesage) => (
					<li className={styles["message-container"]} key={mesage.text}>
						{mesage.text}
						{mesage.type === "wheelAnalys" && <UserWheel />}
						{mesage.type === "suggestionButtons" &&
							mesage.buttonLabels &&
							mesage.buttonLabels.map((button: string) => (
								<button key={button}>{button}</button>
							))}
						{/* {mesage.type === "categoryInputs" && <QuizCategoriesForm />} */}
					</li>
				))}
			</ul>
		</div>
	);
};

export { ChatComponent };
