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
	type QuizUserAnswerDto,
} from "~/modules/quiz/quiz.js";

import {
	editScores,
	getAllQuestions,
	getScores,
	saveAnswers,
} from "./actions.js";

type State = {
	currentCategory: null | QuizQuestionDto[];
	currentCategoryIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: QuizQuestionDto[][];
	scores: QuizScoresGetAllItemResponseDto[];
	userAnswers: QuizUserAnswerDto[];
};

const initialState: State = {
	currentCategory: null,
	currentCategoryIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	questions: [],
	scores: [],
	userAnswers: [],
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
		builder.addCase(editScores.fulfilled, (state, action) => {
			const updatedScores = new Map(
				action.payload.items.map((score) => [score.id, score]),
			);

			state.scores = state.scores.map((stateScore) => {
				const updatedScore = updatedScores.get(stateScore.id);

				return updatedScore
					? {
							...stateScore,
							score: updatedScore.score,
							updatedAt: updatedScore.updatedAt,
						}
					: stateScore;
			});

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(editScores.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(editScores.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
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
