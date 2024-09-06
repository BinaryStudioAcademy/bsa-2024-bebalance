import { type FinalAnswersPayloadDto } from "./final-answers-payload-dto.type.js";

type FinalAnswersRequestDto = {
	userId: number;
} & FinalAnswersPayloadDto;

export { type FinalAnswersRequestDto };
