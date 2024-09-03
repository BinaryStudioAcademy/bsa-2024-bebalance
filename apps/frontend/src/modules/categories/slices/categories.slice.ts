import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CategoryDto } from "../libs/types/types.js";
import { getCategories } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	items: CategoryDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	items: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getCategories.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.items = action.payload;
		});
		builder.addCase(getCategories.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "quiz-categories",
	reducers: {},
});

export { actions, name, reducer };
