import React from "react";

import { Button, ChatMessage, View } from "~/libs/components/components";
import { BottomTabScreenName } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useNavigation,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type NativeStackNavigationProp } from "~/libs/types/types";
import { ButtonsMode, ChatMessageAuthor } from "~/packages/chat/chat";
import { actions as chatActions } from "~/slices/chat/chat";

import { FEEDBACK_TEXT } from "./constants/constants";
import { type RootStackParameterList } from "./types/types";

const AcceptTasks: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const threadId = useAppSelector((state) => state.chat.threadId);
	const taskSuggestions = useAppSelector((state) => state.chat.taskSuggestions);

	const handleAccept = useCallback(() => {
		void dispatch(
			chatActions.createTasks({
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);

		dispatch(chatActions.setButtonsMode(ButtonsMode.NONE));
		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.ASSISTANT,
				text: FEEDBACK_TEXT,
			}),
		);
		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.USER,
				text: "Accept",
			}),
		);

		navigation.navigate(BottomTabScreenName.TASKS);
	}, [dispatch, taskSuggestions, threadId, navigation]);

	const handleGenerateNew = useCallback(() => {
		void dispatch(
			chatActions.getChangedTasksSuggestion({
				payload: taskSuggestions,
				threadId: threadId as string,
			}),
		);

		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.USER,
				text: "Generate new",
			}),
		);
	}, [dispatch, taskSuggestions, threadId]);

	return (
		<ChatMessage text={FEEDBACK_TEXT}>
			<View style={[globalStyles.gap12, globalStyles.mt8]}>
				<Button label="Accept" onPress={handleAccept} />
				<Button
					appearance="outlined"
					label="Regenerate new"
					onPress={handleGenerateNew}
				/>
			</View>
		</ChatMessage>
	);
};

export { AcceptTasks };
