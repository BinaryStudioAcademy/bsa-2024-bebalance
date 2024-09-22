import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type ChatMessageAuthor,
	type ChatMessagePayload,
	type ChatMessageType,
} from "~/modules/chat/chat.js";

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

	if (type === "text") {
		return (
			<li className={messageContainerStyle}>
				<Icon name="aiAssistantAvatar" />
				<div className={contentContainerStyle}>{payload.text}</div>
			</li>
		);
	}
};

export { ChatMessage };
