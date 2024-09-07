import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { QuizApiPath } from "./libs/enums/enums";
import { type QuizQuestionDto } from "./libs/types/types";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
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
