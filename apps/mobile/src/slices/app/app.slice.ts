import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

import { signOut } from "../auth/actions";
import { updateInitialNotificationId } from "./actions";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	initialNotificationId: null | string;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	initialNotificationId: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(updateInitialNotificationId.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateInitialNotificationId.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.initialNotificationId = action.payload;
		});
		builder.addCase(updateInitialNotificationId.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(signOut.pending, () => {
			return initialState;
		});
	},
	initialState,
	name: "app",
	reducers: {},
});

export { actions, name, reducer };
