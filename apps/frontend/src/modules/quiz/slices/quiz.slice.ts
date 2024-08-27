import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type QuizQuestionsDto } from "~/modules/quiz/quiz.js";

import { getQuestions } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	questions: null | QuizQuestionsDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	questions: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getQuestions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getQuestions.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.questions = action.payload;
		});
		builder.addCase(getQuestions.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz",
	reducers: {},
});

export { actions, name, reducer };
