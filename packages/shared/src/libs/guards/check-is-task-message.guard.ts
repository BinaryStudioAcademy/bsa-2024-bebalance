import {
	type ChatMessageDto,
	type TaskMessage,
} from "../../modules/chats/chats.js";

const checkIsTaskMessage = (
	message: ChatMessageDto,
): message is ChatMessageDto<TaskMessage> => {
	return message.type === "task";
};

export { checkIsTaskMessage };
