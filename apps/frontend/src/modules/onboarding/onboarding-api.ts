import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { OnboardingApiPath } from "./libs/enums/enums.js";
import {
	type OnboardingAnswerRequestDto,
	type OnboardingGetAllResponseDto,
	type OnboardingUserAnswerDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class OnboardingApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ONBOARDING, storage });
	}

	public async getAll(): Promise<OnboardingGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(OnboardingApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<OnboardingGetAllResponseDto>();
	}

	public async saveAnswers(
		payload: OnboardingAnswerRequestDto,
	): Promise<OnboardingUserAnswerDto[]> {
		const response = await this.load(
			this.getFullEndpoint(OnboardingApiPath.ANSWER, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<OnboardingUserAnswerDto[]>();
	}
}

export { OnboardingApi };
