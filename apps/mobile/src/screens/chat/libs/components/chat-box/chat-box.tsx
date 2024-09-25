import { ChatMessage } from "~/libs/components/components";
import { type ValueOf } from "~/libs/types/types";
import {
	type ChatMessageAuthor,
	ChatMessageType,
	type TaskMessage,
	type TextMessage,
} from "~/packages/chat/chat";

import { AITask } from "./libs/components/components";

type Properties = {
	author: ValueOf<typeof ChatMessageAuthor>;
	payload: TaskMessage | TaskMessage[] | TextMessage;
	type: ValueOf<typeof ChatMessageType>;
};

const ChatBox: React.FC<Properties> = ({
	author,
	payload,
	type,
}: Properties) => {
	const isUserMessage = author === "user";

	switch (type) {
		case ChatMessageType.TEXT: {
			return (
				<ChatMessage content={payload as TextMessage} isUser={isUserMessage} />
			);
		}

		case ChatMessageType.TASK: {
			return (
				<ChatMessage isUser={isUserMessage}>
					<AITask tasks={payload as TaskMessage[]} />
				</ChatMessage>
			);
		}

		default: {
			return null;
		}
	}
};

export { ChatBox };
