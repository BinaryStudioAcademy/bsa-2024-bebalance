import {
	type ChatMessageDto,
	ChatMessageType,
	type TaskMessage,
} from "../../../chats.js";

const checkIsTaskType = (
	message: ChatMessageDto,
): message is ChatMessageDto<TaskMessage> => {
	return message.type === ChatMessageType.TASK;
};

export { checkIsTaskType };
