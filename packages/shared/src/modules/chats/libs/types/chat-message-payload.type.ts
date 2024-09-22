import { type BalanceWheelMessage } from "./balance-wheel-message.type.js";
import { type TaskMessage } from "./task-message.type.js";
import { type TextMessage } from "./text.message.type.js";

type ChatMessagePayload = Partial<
	BalanceWheelMessage & TaskMessage & TextMessage
>;

export { type ChatMessagePayload };
