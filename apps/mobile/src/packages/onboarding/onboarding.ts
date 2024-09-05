import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { OnboardingApi } from "./onboarding-api";

const onboardingApi = new OnboardingApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { onboardingApi };
export {
	type OnboardingAnswerDto,
	type OnboardingGetAllResponseDto,
	type OnboardingQuestionResponseDto,
} from "./libs/types/types";
export { oneAnswerSelectedValidationSchema } from "./libs/validation-schemas/validation-schemas";
