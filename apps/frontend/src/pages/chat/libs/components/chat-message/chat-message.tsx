import { Icon, TaskCard } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessagePayload,
	ChatMessageType,
} from "~/modules/chat/chat.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import styles from "./styles.module.css";

type Properties = {
	author: ValueOf<typeof ChatMessageAuthor>;
	payload: ChatMessagePayload;
	type: ValueOf<typeof ChatMessageType>;
};

const ChatMessage: React.FC<Properties> = ({
	author,
	payload,
	type,
}: Properties) => {
	const messageContainerStyle = getValidClassNames(
		styles["message-container"],
		author === "assistant"
			? styles["message-container-assistant"]
			: styles["message-container-user"],
	);

	const contentContainerStyle = getValidClassNames(
		styles["content-container"],
		author === "assistant"
			? styles["content-container-assistant"]
			: styles["content-container-user"],
	);

	switch (type) {
		case ChatMessageType.TEXT: {
			return (
				<li className={messageContainerStyle}>
					<Icon name="aiAssistantAvatar" />
					<div className={contentContainerStyle}>{payload.text}</div>
				</li>
			);
		}

		case ChatMessageType.TASK: {
			return (
				<li>
					<Icon name="aiAssistantAvatar" />
					<div className={contentContainerStyle}>
						<TaskCard task={payload.task as TaskDto} />
					</div>
				</li>
			);
		}

		default: {
			return null;
		}
	}
};

export { ChatMessage };
