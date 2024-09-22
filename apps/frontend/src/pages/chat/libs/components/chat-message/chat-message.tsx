import defaultAvatar from "~/assets/img/default-avatar.png";
import { Icon, TaskCard } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserDto, type ValueOf } from "~/libs/types/types.js";
import {
	ChatMessageAuthor,
	ChatMessageType,
	type TaskPayload,
	type TextMessage,
} from "~/modules/chat/chat.js";

import styles from "./styles.module.css";

type Properties = {
	author: ValueOf<typeof ChatMessageAuthor>;
	payload: TaskPayload | TextMessage;
	type: ValueOf<typeof ChatMessageType>;
};

const ChatMessage: React.FC<Properties> = ({
	author,
	payload,
	type,
}: Properties) => {
	const user = useAppSelector((state) => state.auth.user as UserDto);
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
					{author === ChatMessageAuthor.ASSISTANT ? (
						<Icon name="aiAssistantAvatar" />
					) : (
						<img
							alt={`${user.name}'s avatar`}
							className={styles["avatar"]}
							src={user.avatarUrl ?? defaultAvatar}
						/>
					)}
					<div className={contentContainerStyle}>
						{(payload as TextMessage).text}
					</div>
				</li>
			);
		}

		case ChatMessageType.TASK: {
			return (
				<li className={messageContainerStyle}>
					<Icon name="aiAssistantAvatar" />
					<div className={contentContainerStyle}>
						<TaskCard task={(payload as TaskPayload).task} />
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
