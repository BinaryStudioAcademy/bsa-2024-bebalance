import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {type OnboardingQuestionResponseDto} from "~/packages/onboarding/onboarding";
import { PREVIOUS_INDEX_OFFSET,ZERO_INDEX } from "~/libs/constants/constants";

import { getAll } from "./actions";

type State = {
	questions: OnboardingQuestionResponseDto[];
	currentQuestion: OnboardingQuestionResponseDto | null;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
		questions: [],
		currentQuestion: null,
		currentQuestionIndex: ZERO_INDEX,
		dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.questions = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
			state.currentQuestion = state.questions[state.currentQuestionIndex] || null;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {
		nextQuestion(state){
			if (state.currentQuestionIndex < state.questions.length - 1) {
				state.currentQuestionIndex += PREVIOUS_INDEX_OFFSET;
				state.currentQuestion = state.questions[state.currentQuestionIndex] || null;
			}
		},
		previousQuestion(state){
			if (state.currentQuestionIndex > 0) {
				state.currentQuestionIndex -= PREVIOUS_INDEX_OFFSET;
				state.currentQuestion = state.questions[state.currentQuestionIndex] || null;
			}
		}
	},
});

export { actions, name, reducer };
