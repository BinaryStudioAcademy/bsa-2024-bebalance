import { createSlice } from "@reduxjs/toolkit";

// import { PREVIOUS_INDEX_OFFSET, ZERO_INDEX } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type QuizQuestionDto } from "~/packages/quiz/quiz";

import { getAllQuestions } from "./actions";

type State = {
	currentCategory: null | QuizQuestionDto[];
	currentCategoryIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
	questions: QuizQuestionDto[][];
};

const initialState: State = {
	currentCategory: null,
	currentCategoryIndex: 0,
	dataStatus: DataStatus.IDLE,
	questions: [],
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
	},
	initialState,
	name: "quiz",
	reducers: {
		nextQuestion(state) {
			state.currentCategoryIndex += 1;
			state.currentCategory =
				state.questions[state.currentCategoryIndex] || null;
		},
		previousQuestion(state) {
			if (state.currentCategoryIndex > initialState.currentCategoryIndex) {
				state.currentCategoryIndex -= 1;
				state.currentCategory =
					state.questions[state.currentCategoryIndex] || null;
			}
		},
		// setAnswersByQuestionIndex: (state, action: PayloadAction<Properties>) => {
		// 	const { answerId, questionIndex } = action.payload;
		// 	state.answersByQuestionIndex[questionIndex] = answerId;
		// },
	},
});

export { actions, name, reducer };
