import { APIPath, ContentType } from "~/libs/enums/enums";
import { BaseHttpApi } from "~/libs/packages/api/api";
import { type HTTP } from "~/libs/packages/http/http";
import { type Storage } from "~/libs/packages/storage/storage";

import { OnboardingApiPath } from "./libs/enums/enums";
import { type OnboardingGetAllResponseDto } from "./libs/types/types";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class OnboardingApi extends BaseHttpApi {
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
}

export { OnboardingApi };
