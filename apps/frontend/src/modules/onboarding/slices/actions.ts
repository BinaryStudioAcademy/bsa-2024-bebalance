import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingGetAllResponseDto,
	type OnboardingUserAnswerDto,
} from "~/modules/onboarding/onboarding.js";

import { name as sliceName } from "./onboarding.slice.js";

const saveAnswers = createAsyncThunk<
	OnboardingUserAnswerDto[],
	OnboardingAnswerRequestBodyDto,
	AsyncThunkConfig
>(`${sliceName}/save-answers`, async (createAnswerPayload, { extra }) => {
	const { onboardingApi } = extra;

	return await onboardingApi.saveAnswers(createAnswerPayload);
});

const getAll = createAsyncThunk<
	OnboardingGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAll`, (_, { extra }) => {
	const { onboardingApi } = extra;

	return onboardingApi.getAll();
});

export { getAll, saveAnswers };
