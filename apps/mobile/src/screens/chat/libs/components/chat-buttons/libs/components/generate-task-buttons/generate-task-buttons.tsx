import React from "react";

import { Button, ChatMessage, View } from "~/libs/components/components";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { ButtonsMode, ChatMessageAuthor } from "~/packages/chat/chat";
import { actions as chatActions } from "~/slices/chat/chat";

import { CONFIRMATION_TEXT } from "./libs/constants/constants";
import { getLowestCategories } from "./libs/helpers/helpers";

const GenerateTaskButtons: React.FC = () => {
	const dispatch = useAppDispatch();

	const scores = useAppSelector((state) => state.quiz.scores);
	const threadId = useAppSelector((state) => state.chat.threadId);

	const lowestCategories = getLowestCategories(scores);

	const handleDisplayCheckboxes = useCallback(() => {
		dispatch(chatActions.setButtonsMode(ButtonsMode.CHECKBOX));
		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.USER,
				text: "No, something else",
			}),
		);
	}, [dispatch]);

	const handleCreationTasksForThreeLowest = useCallback(() => {
		void dispatch(
			chatActions.getTasksForCategories({
				categories: lowestCategories,
				threadId: threadId as string,
			}),
		);

		void dispatch(chatActions.updateSelectedCategories(lowestCategories));

		dispatch(chatActions.setButtonsMode(ButtonsMode.EXPLAIN_ACCEPT));
		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.ASSISTANT,
				text: CONFIRMATION_TEXT,
			}),
		);
		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.USER,
				text: "Yes, 3 lowest",
			}),
		);
	}, [dispatch, threadId, lowestCategories]);

	return (
		<ChatMessage text={CONFIRMATION_TEXT}>
			<View style={[globalStyles.gap12, globalStyles.mt12]}>
				<Button
					label="Yes, 3 lowest"
					onPress={handleCreationTasksForThreeLowest}
				/>
				<Button
					appearance="outlined"
					label="No, something else"
					onPress={handleDisplayCheckboxes}
				/>
			</View>
		</ChatMessage>
	);
};

export { GenerateTaskButtons };
