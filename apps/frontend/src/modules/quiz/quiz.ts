import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { QuizApi } from "./quiz-api.js";

const quizApi = new QuizApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	type QuizAnswersDto,
	type QuizQuestionsDto,
	type QuizQuestionsGetAllReponseDto,
} from "./libs/types/types.js";
export { quizApi };
export { actions, reducer } from "./slices/quiz.js";
