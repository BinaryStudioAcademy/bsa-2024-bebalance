import { APIPath, ContentType } from "~/libs/enums/enums";
import { type ApiConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { QuizApiPath } from "./libs/enums/enums";
import { type QuizQuestionDto } from "./libs/types/types";

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: ApiConfiguration) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async getAllQuestions(): Promise<{ items: QuizQuestionDto[][] }> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.QUESTIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: QuizQuestionDto[][] }>();
	}
}

export { QuizApi };
