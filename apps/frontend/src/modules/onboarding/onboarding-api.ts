import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";

import { OnboardingApiPath } from "./libs/enums/enums.js";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingGetAllResponseDto,
	type OnboardingUserAnswerDto,
} from "./libs/types/types.js";

class OnboardingApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
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
		payload: OnboardingAnswerRequestBodyDto,
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
