import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { PREVIOUS_INDEX_OFFSET, ZERO_INDEX } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllItemResponseDto,
} from "~/packages/quiz/quiz";

import { editScores, getAllQuestions, getScores } from "./actions";

type Properties = {
	answerId: number;
	questionIndex: number;
};

type State = {
	answersByQuestionIndex: number[];
	currentQuestion: null | QuizQuestionDto;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: QuizQuestionDto[];
	scores: QuizScoresGetAllItemResponseDto[];
};

const initialState: State = {
	answersByQuestionIndex: [],
	currentQuestion: null,
	currentQuestionIndex: ZERO_INDEX,
	dataStatus: DataStatus.IDLE,
	questions: [],
	scores: [],
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
