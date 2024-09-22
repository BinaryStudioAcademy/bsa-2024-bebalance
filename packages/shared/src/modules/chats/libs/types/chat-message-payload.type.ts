import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

type ChatMessagePayload = TaskMessage | TextMessage;

export { type ChatMessagePayload };
