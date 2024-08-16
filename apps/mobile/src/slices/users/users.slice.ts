import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type UserGetAllItemResponseDto } from "~/packages/users/users";

import { loadAll } from "./actions";

type State = {
	users: UserGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	users: [],
	dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
	initialState,
	name: "users",
	reducers: {},
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
	},
});

export { actions, name, reducer };
