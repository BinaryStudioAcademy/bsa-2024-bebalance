import { createSlice } from "@reduxjs/toolkit";

import {
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type OnboardingQuestionResponseDto,
	type OnboardingUserAnswerDto,
} from "~/modules/onboarding/onboarding.js";

import { getAll, saveAnswers } from "./actions.js";

type State = {
	currentQuestion: null | OnboardingQuestionResponseDto;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: OnboardingQuestionResponseDto[];
	userAnswers: OnboardingUserAnswerDto[];
};

const initialState: State = {
	currentQuestion: null,
	currentQuestionIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	questions: [],
	userAnswers: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.questions = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] || null;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(saveAnswers.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(saveAnswers.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.userAnswers = action.payload;
		});
		builder.addCase(saveAnswers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {
		nextQuestion(state) {
			state.currentQuestionIndex += PREVIOUS_INDEX_OFFSET;
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] || null;
		},
		previousQuestion(state) {
			if (state.currentQuestionIndex > initialState.currentQuestionIndex) {
				state.currentQuestionIndex -= PREVIOUS_INDEX_OFFSET;
				state.currentQuestion =
					state.questions[state.currentQuestionIndex] || null;
			}
		},
	},
});

export { actions, name, reducer };
