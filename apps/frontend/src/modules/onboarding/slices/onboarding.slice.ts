import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type OnboardingQuestionDto } from "~/modules/onboarding/onboarding.js";

import { getAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	onboarding: OnboardingQuestionDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	onboarding: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.onboarding = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {},
});

export { actions, name, reducer };
