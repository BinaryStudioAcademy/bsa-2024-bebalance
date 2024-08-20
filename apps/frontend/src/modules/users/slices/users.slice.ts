import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getAuthenticatedUser, loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	user: null | UserGetAllItemResponseDto;
	users: UserGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	user: null,
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
