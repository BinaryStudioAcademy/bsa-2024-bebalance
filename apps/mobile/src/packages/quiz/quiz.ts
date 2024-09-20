import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { QuizApi } from "./quiz-api";

const quizApi = new QuizApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { quizApi };
export {
	type QuizAnswerDto,
	type QuizAnswersRequestDto,
	type QuizQuestionDto,
	type QuizScoresGetAllItemResponseDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresResponseDto,
	type QuizScoresUpdateRequestDto,
	type QuizUserAnswerDto,
} from "./libs/types/types";
export {
	categoryAnswerSelectedValidationSchema,
	updateScoresValidationSchema,
} from "./libs/validation-schemas/validation-schemas";
