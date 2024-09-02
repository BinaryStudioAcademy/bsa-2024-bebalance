import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type QuizCategoryDto } from "~/packages/quiz/quiz";

import { getQuizCategories } from "./actions";

type State = {
	categories: QuizCategoryDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	categories: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getQuizCategories.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getQuizCategories.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.categories = action.payload;
		});
		builder.addCase(getQuizCategories.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz",
	reducers: {},
});

export { actions, name, reducer };
