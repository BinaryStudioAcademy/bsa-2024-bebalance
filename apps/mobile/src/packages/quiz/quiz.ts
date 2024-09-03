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
export { APIPath } from "./libs/enums/enums";
export { type CategoryDto, type GetCategoriesDto } from "./libs/types/types";
export { quizCategoriesValidationSchema } from "./libs/validation-schemas/validation-schemas";
