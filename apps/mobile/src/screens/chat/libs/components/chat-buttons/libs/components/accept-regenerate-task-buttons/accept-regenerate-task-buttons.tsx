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

import { AI_RESPONSE, EXPLAIN_TEXT } from "./constants/constants";
import { type RootStackParameterList } from "./types/types";

const AcceptRegenerateTaskButtons: React.FC = () => {
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
				author: ChatMessageAuthor.USER,
				text: "Accept",
			}),
		);

		dispatch(
			chatActions.addTextMessage({
				author: ChatMessageAuthor.ASSISTANT,
				text: AI_RESPONSE,
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
				text: "I don't like the tasks.",
			}),
		);
	}, [dispatch, taskSuggestions, threadId]);

	return (
		<ChatMessage text={EXPLAIN_TEXT}>
			<View style={[globalStyles.gap12, globalStyles.mt8]}>
				<Button label="Everything is clear" onPress={handleAccept} />
				<Button
					appearance="outlined"
					label="I don't like the tasks"
					onPress={handleGenerateNew}
				/>
			</View>
		</ChatMessage>
	);
};

export { AcceptRegenerateTaskButtons };
