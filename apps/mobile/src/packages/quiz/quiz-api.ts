import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";
import { type GetCategoriesDto } from "~/packages/quiz/quiz";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CATEGORIES, storage });
	}

	public async getQuizCategories(): Promise<GetCategoriesDto> {
		const response = await this.load(this.getFullEndpoint("/", {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "GET",
		});

		return await response.json<GetCategoriesDto>();
	}
}

export { QuizApi };
