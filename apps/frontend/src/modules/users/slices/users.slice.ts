import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import { getById, saveNotificationAnswers, update } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	user: null | UserDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(saveNotificationAnswers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(saveNotificationAnswers.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(saveNotificationAnswers.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(update.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(update.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
