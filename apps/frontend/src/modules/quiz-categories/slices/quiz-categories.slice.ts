import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type QuizCategoryDto } from "../libs/types/types.js";
import { fetchQuizCategories } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	items: QuizCategoryDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	items: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(fetchQuizCategories.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(fetchQuizCategories.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.items = action.payload;
		});
		builder.addCase(fetchQuizCategories.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz-categories",
	reducers: {},
});

export { actions, name, reducer };
