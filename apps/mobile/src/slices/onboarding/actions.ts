import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingGetAllResponseDto,
	type OnboardingUserAnswerDto,
} from "~/packages/onboarding/onboarding";

import { name as sliceName } from "./onboarding.slice";

const getAll = createAsyncThunk<
	OnboardingGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAll`, async (_, { extra }) => {
	const { onboardingApi } = extra;

	return await onboardingApi.getAll();
});

const saveAnswers = createAsyncThunk<
	OnboardingUserAnswerDto[],
	OnboardingAnswerRequestBodyDto,
	AsyncThunkConfig
>(`${sliceName}/save-answers`, async (createAnswerPayload, { extra }) => {
	const { onboardingApi } = extra;

	return await onboardingApi.saveAnswers(createAnswerPayload);
});

export { getAll, saveAnswers };
