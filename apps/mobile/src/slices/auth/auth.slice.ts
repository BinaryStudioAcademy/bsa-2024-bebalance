import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { signIn, signUp } from "./actions";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
