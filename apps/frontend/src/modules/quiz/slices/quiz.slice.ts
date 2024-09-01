import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type QuizScoreDto } from "../libs/types/types.js";
import { getScores } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	scores: null | QuizScoreDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	scores: null,
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
	},
	initialState,
	name: "quiz",
	reducers: {},
});

export { actions, name, reducer };
