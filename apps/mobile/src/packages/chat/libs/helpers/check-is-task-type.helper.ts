import { ChatMessageType } from "../enums/enums";
import { type ChatMessageDto, type TaskMessage } from "../types/types";

const checkIsTaskType = (
	message: ChatMessageDto,
): message is ChatMessageDto<TaskMessage> => {
	return message.type === ChatMessageType.TASK;
};

export { checkIsTaskType };
