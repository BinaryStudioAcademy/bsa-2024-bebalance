import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { SurveyApiPath } from "./libs/enums/enums.js";
import { type SurveyResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class OnboardingApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.SURVEYS, storage });
	}

	public async getOnboardingSurvey(): Promise<SurveyResponseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(SurveyApiPath.ONBOARDING, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<SurveyResponseDto[]>();
	}
}

export { OnboardingApi };
