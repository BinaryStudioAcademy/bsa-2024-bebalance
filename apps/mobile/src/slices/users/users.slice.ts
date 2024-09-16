import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type UserDto } from "~/packages/users/users";

import { getById, saveNotificationAnswers } from "./actions";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	user: null | UserDto;
	users: UserDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.user = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
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
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
