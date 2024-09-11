import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { OnboardingApiPath } from "./libs/enums/enums";
import { type OnboardingGetAllResponseDto } from "./libs/types/types";

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
}

export { OnboardingApi };
