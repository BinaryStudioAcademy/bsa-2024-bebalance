import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { PREVIOUS_INDEX_OFFSET, ZERO_INDEX } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {
	type OnboardingQuestionResponseDto,
	type OnboardingUserAnswerDto,
} from "~/packages/onboarding/onboarding";

import { signOut } from "../auth/actions";
import { getAll, saveAnswers } from "./actions";

type State = {
	answersByQuestionIndex: number[];
	currentQuestion: null | OnboardingQuestionResponseDto;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: OnboardingQuestionResponseDto[];
	userAnswers: OnboardingUserAnswerDto[];
};

type Properties = {
	answerId: number;
	questionIndex: number;
};

const initialState: State = {
	answersByQuestionIndex: [],
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
				state.questions[state.currentQuestionIndex] ?? null;
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
		builder.addCase(signOut.pending, () => {
			return initialState;
		});
	},
	initialState,
	name: "onboarding",
	reducers: {
		nextQuestion(state) {
			state.currentQuestionIndex += PREVIOUS_INDEX_OFFSET;
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] ?? null;
		},
		previousQuestion(state) {
			if (state.currentQuestionIndex > initialState.currentQuestionIndex) {
				state.currentQuestionIndex -= PREVIOUS_INDEX_OFFSET;
				state.currentQuestion =
					state.questions[state.currentQuestionIndex] ?? null;
			}
		},
		setAnswersByQuestionIndex: (state, action: PayloadAction<Properties>) => {
			const { answerId, questionIndex } = action.payload;
			state.answersByQuestionIndex[questionIndex] = answerId;
		},
	},
});

export { actions, name, reducer };
