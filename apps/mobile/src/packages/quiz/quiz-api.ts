import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { QuizApiPath } from "./libs/enums/enums";
import { type QuizGetAllCategoriesResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async getQuizCategories(): Promise<QuizGetAllCategoriesResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.CATEGORIES, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<QuizGetAllCategoriesResponseDto>();
	}
}

export { QuizApi };
