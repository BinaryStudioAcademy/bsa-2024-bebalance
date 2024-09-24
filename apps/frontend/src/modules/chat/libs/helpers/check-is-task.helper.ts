import { type ChatMessageDto, type TaskMessage } from "../types/types.js";

const checkIsTask = (
	message: ChatMessageDto,
): message is ChatMessageDto<TaskMessage> => {
	return message.type === "task";
};

export { checkIsTask };
