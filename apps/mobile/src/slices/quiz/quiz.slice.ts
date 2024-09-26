import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { PREVIOUS_INDEX_OFFSET, ZERO_INDEX } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllItemResponseDto,
	type QuizUserAnswerDto,
} from "~/packages/quiz/quiz";

import { signOut } from "../auth/actions";
import {
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
	saveAnswers,
} from "./actions";

type Properties = {
	answerId: number;
	questionIndex: number;
};

type State = {
	answersByQuestionIndex: number[];
	currentQuestion: null | QuizQuestionDto;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	isRetakingQuiz: boolean;
	questions: QuizQuestionDto[];
	scores: QuizScoresGetAllItemResponseDto[];
	userAnswers: QuizUserAnswerDto[];
};

const initialState: State = {
	answersByQuestionIndex: [],
	currentQuestion: null,
	currentQuestionIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	isRetakingQuiz: false,
	questions: [],
	scores: [],
	userAnswers: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
		builder.addCase(getQuestionsByCategoryIds.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.isRetakingQuiz = true;
		});
		builder.addCase(getQuestionsByCategoryIds.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questions = action.payload.items.flat();
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] ?? null;
		});
		builder.addCase(getQuestionsByCategoryIds.rejected, (state) => {
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
	name: "quiz",
	reducers: {
		cleanAnswers(state) {
			state.answersByQuestionIndex = [];
			state.currentQuestionIndex = initialState.currentQuestionIndex;
			state.currentQuestion =
				state.questions[state.currentQuestionIndex] ?? null;
		},
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
		setRetakingQuiz: (state, action: PayloadAction<boolean>) => {
			state.isRetakingQuiz = action.payload;
		},
	},
});

export { actions, name, reducer };
