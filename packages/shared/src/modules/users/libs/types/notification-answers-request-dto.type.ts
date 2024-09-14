import { type NotificationAnswersPayloadDto } from "./notification-answers-payload-dto.type.js";

type NotificationAnswersRequestDto = {
	userId: number;
} & NotificationAnswersPayloadDto;

export { type NotificationAnswersRequestDto };
