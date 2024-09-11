import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
	CHECKBOX_CATEGORIES_INITIAL_DATA,
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllItemResponseDto,
} from "~/packages/quiz/quiz";

import { getAllQuestions, getScores } from "./actions";

type Properties = {
	answerId: number;
	questionIndex: number;
};

type State = {
	answersByQuestionIndex: number[];
	categories: QuizScoresGetAllItemResponseDto[];
	currentQuestion: null | QuizQuestionDto;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: QuizQuestionDto[];
};

const initialState: State = {
	answersByQuestionIndex: [],
	categories: CHECKBOX_CATEGORIES_INITIAL_DATA,
	currentQuestion: null,
	currentQuestionIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	questions: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getScores.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getScores.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.categories = action.payload.items;
		});
		builder.addCase(getScores.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getAllQuestions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllQuestions.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questions = action.payload.items.flat();
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] ?? null;
		});
		builder.addCase(getAllQuestions.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz",
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
