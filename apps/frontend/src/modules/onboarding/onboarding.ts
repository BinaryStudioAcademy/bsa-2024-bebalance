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
	type OnboardingAnswerRequestBodyDto,
	type OnboardingGetAllResponseDto,
	type OnboardingQuestionResponseDto,
	type OnboardingUserAnswerDto,
} from "./libs/types/types.js";
export { oneAnswerSelectedValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/onboarding.js";
