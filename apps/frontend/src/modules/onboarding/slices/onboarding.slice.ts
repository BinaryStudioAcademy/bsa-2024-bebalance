import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type OnboardingQuestionResponseDto } from "~/modules/onboarding/onboarding.js";

import { getAll } from "./actions.js";

type State = {
	allQuestions: OnboardingQuestionResponseDto[];
	currentQuestion: OnboardingQuestionResponseDto | undefined;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	allQuestions: [],
	currentQuestion: undefined,
	currentQuestionIndex: 0,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.allQuestions = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
			state.currentQuestion = state.allQuestions[state.currentQuestionIndex];
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {
		nextQuestion(state) {
			state.currentQuestionIndex += 1;
			state.currentQuestion = state.allQuestions[state.currentQuestionIndex];
		},
		previousQuestion(state) {
			if (state.currentQuestionIndex > initialState.currentQuestionIndex) {
				state.currentQuestionIndex -= 1;
				state.currentQuestion = state.allQuestions[state.currentQuestionIndex];
			}
		},
	},
});

export { actions, name, reducer };
