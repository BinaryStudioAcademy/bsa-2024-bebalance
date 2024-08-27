import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type SurveyResponseDto } from "~/modules/onboarding/onboarding.js";

import { getOnboardingSurvey } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	onboardingSurvey: null | SurveyResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	onboardingSurvey: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getOnboardingSurvey.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getOnboardingSurvey.fulfilled, (state, action) => {
			state.onboardingSurvey = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getOnboardingSurvey.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {},
});

export { actions, name, reducer };
