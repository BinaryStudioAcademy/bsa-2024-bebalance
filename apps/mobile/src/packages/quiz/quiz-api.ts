import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { QuizApiPath } from "./libs/enums/enums";
import { type QuizScoresGetAllResponseDto } from "./libs/types/types";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async getScores(): Promise<QuizScoresGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.SCORE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<QuizScoresGetAllResponseDto>();
	}
}

export { QuizApi };
