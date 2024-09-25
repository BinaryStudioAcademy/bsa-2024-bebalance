import { type ChatMessageDto, type TaskMessage } from "../types/types.js";

const checkIsTaskMessage = (
	message: ChatMessageDto,
): message is ChatMessageDto<TaskMessage> => {
	return message.type === "task";
};

export { checkIsTaskMessage };
