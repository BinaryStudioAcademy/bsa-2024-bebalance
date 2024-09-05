import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type CategoryDto } from "~/packages/categories/categories";

import { getCategories } from "./actions";

type State = {
	categories: CategoryDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	categories: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getCategories.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.categories = action.payload;
		});
		builder.addCase(getCategories.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "categories",
	reducers: {},
});

export { actions, name, reducer };
