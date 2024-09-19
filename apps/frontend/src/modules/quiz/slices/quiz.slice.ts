import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
import { Step } from "~/pages/quiz/libs/enums/step.js";

import {
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
	saveAnswers,
} from "./actions.js";

type State = {
	currentCategoryIndex: number;
	currentCategoryQuestions: null | QuizQuestionDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	isRetakingQuiz: boolean;
	questionsByCategories: QuizQuestionDto[][];
	scores: QuizScoresGetAllItemResponseDto[];
	step: ValueOf<typeof Step>;
	userAnswers: QuizUserAnswerDto[];
};

const initialState: State = {
	currentCategoryIndex: ZERO_INDEX,
	currentCategoryQuestions: null,
	dataStatus: DataStatus.IDLE,
	isRetakingQuiz: false,
	questionsByCategories: [],
	scores: [],
	step: Step.MOTIVATION,
	userAnswers: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllQuestions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllQuestions.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questionsByCategories = action.payload.items;
			state.currentCategoryQuestions =
				state.questionsByCategories[state.currentCategoryIndex] || null;
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
			state.questionsByCategories = action.payload.items;
			state.currentCategoryQuestions =
				state.questionsByCategories[state.currentCategoryIndex] || null;
		});
		builder.addCase(getQuestionsByCategoryIds.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.isRetakingQuiz = false;
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
			state.isRetakingQuiz = false;
		});
		builder.addCase(saveAnswers.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.userAnswers = action.payload;
			state.currentCategoryIndex = ZERO_INDEX;
			state.isRetakingQuiz = false;
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

			state.currentCategoryQuestions =
				state.questionsByCategories[state.currentCategoryIndex] ?? null;
		},
		nextStep(state) {
			state.step++;
		},
		previousQuestion(state) {
			if (state.currentCategoryIndex > initialState.currentCategoryIndex) {
				state.currentCategoryIndex -= PREVIOUS_INDEX_OFFSET;
				state.currentCategoryQuestions =
					state.questionsByCategories[state.currentCategoryIndex] ?? null;
			}
		},
		setStep(state, action: PayloadAction<ValueOf<typeof Step>>) {
			state.step = action.payload;
		},
	},
});

export { actions, name, reducer };
