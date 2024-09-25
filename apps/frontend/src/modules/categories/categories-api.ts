import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";

import { CategoriesApiPath } from "./libs/enums/enums.js";
import { type CategoriesGetAllResponseDto } from "./libs/types/types.js";

class CategoriesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.CATEGORIES, storage });
	}

	public async getCategories(): Promise<CategoriesGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(CategoriesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<CategoriesGetAllResponseDto>();
	}
}

export { CategoriesApi };
