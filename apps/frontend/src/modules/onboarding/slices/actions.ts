import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type SurveyResponseDto } from "~/modules/onboarding/onboarding.js";

import { name as sliceName } from "./onboarding.slice.js";

const getOnboardingSurvey = createAsyncThunk<
	SurveyResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getOnboardingSurvey`, (_, { extra }) => {
	const { onboardingApi } = extra;

	return onboardingApi.getOnboardingSurvey();
});

export { getOnboardingSurvey };
