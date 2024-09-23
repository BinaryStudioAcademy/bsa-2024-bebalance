import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { OnboardingApiPath } from "./libs/enums/enums";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingGetAllResponseDto,
	type OnboardingUserAnswerDto,
} from "./libs/types/types";

class OnboardingApi extends BaseHttpApi {
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
