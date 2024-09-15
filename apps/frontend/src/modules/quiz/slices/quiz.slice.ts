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
import { Step } from "~/pages/quiz/libs/enums/step.js";

import {
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
} from "./actions.js";

type State = {
	currentCategory: null | QuizQuestionDto[];
	currentCategoryIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	isRetakingQuiz: boolean;
	questions: QuizQuestionDto[][];
	scores: QuizScoresGetAllItemResponseDto[];
	step: ValueOf<typeof Step>;
};

const initialState: State = {
	currentCategory: null,
	currentCategoryIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	isRetakingQuiz: false,
	questions: [],
	scores: [],
	step: Step.MOTIVATION,
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

		builder.addCase(getQuestionsByCategoryIds.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isRetakingQuiz = true;
		});
		builder.addCase(getQuestionsByCategoryIds.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questions = action.payload.items;
			state.currentCategory =
				state.questions[state.currentCategoryIndex] || null;
			state.step = Step.QUIZ;
		});
		builder.addCase(getQuestionsByCategoryIds.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.isRetakingQuiz = false;
			state.step = Step.MOTIVATION;
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
		nextStep(state) {
			state.step++;
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
