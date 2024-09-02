import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { QuizApiPath } from "./libs/enums/enums.js";
import { type QuizGetAllCategoriesResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHTTPApi {
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
