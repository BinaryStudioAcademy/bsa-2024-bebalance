import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type OnboardingGetAllResponseDto } from "~/modules/onboarding/onboarding.js";

import { name as sliceName } from "./onboarding.slice.js";

const getAll = createAsyncThunk<
	OnboardingGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/getAll`, (_, { extra }) => {
	const { onboardingApi } = extra;

	return onboardingApi.getAll();
});

export { getAll };
