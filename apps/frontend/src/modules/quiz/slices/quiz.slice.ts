import { createSlice } from "@reduxjs/toolkit";

import {
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllItemResponseDto,
} from "~/modules/quiz/quiz.js";

import { getAllQuestions, getScores } from "./actions.js";

type State = {
	currentCategory: null | QuizQuestionDto[];
	currentCategoryIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: QuizQuestionDto[][];
	scores: [] | QuizScoresGetAllItemResponseDto[];
};

const initialState: State = {
	currentCategory: null,
	currentCategoryIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	questions: [],
	scores: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllQuestions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllQuestions.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questions = action.payload.items;
			state.currentCategory =
				state.questions[state.currentCategoryIndex] || null;
		});
		builder.addCase(getAllQuestions.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getScores.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getScores.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.scores = action.payload.items;
		});
		builder.addCase(getScores.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz",
	reducers: {
		nextQuestion(state) {
			state.currentCategoryIndex += PREVIOUS_INDEX_OFFSET;
			state.currentCategory =
				state.questions[state.currentCategoryIndex] || null;
		},
		previousQuestion(state) {
			if (state.currentCategoryIndex > initialState.currentCategoryIndex) {
				state.currentCategoryIndex -= PREVIOUS_INDEX_OFFSET;
				state.currentCategory =
					state.questions[state.currentCategoryIndex] || null;
			}
		},
	},
});

export { actions, name, reducer };
