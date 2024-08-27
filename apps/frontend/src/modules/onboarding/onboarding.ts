import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { OnboardingApi } from "./onboarding-api.js";

const onboardingApi = new OnboardingApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { onboardingApi };
export {
	type OnboardingAnswerDto,
	type OnboardingGetAllResponseDto,
	type OnboardingQuestionDto,
} from "./libs/types/types.js";
export { actions, reducer } from "./slices/onboarding.js";
