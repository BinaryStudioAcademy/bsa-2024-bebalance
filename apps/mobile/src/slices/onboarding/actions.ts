import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type OnboardingGetAllResponseDto } from "~/packages/onboarding/onboarding";

import { name as sliceName } from "./onboarding.slice";

const getAll = createAsyncThunk<
	OnboardingGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAll`, async (_, { extra }) => {
	const { onboardingApi } = extra;

	return await onboardingApi.getAll();
});

export { getAll };
