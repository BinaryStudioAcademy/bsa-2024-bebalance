import { createSlice } from "@reduxjs/toolkit";

import { CHECKBOX_CATEGORIES_INITIAL_DATA } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type QuizScoresGetAllItemResponseDto } from "~/packages/quiz/quiz";

import { getScores } from "./actions";

type State = {
	categories: QuizScoresGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	categories: CHECKBOX_CATEGORIES_INITIAL_DATA,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getScores.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getScores.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.categories = action.payload.items;
		});
		builder.addCase(getScores.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz",
	reducers: {},
});

export { actions, name, reducer };
