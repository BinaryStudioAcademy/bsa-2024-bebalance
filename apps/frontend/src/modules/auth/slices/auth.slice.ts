import { createSlice } from "@reduxjs/toolkit";

import { DataStatus, NotificationMessage } from "~/libs/enums/enums.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import {
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
} from "./actions.js";

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
		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.user = action.payload;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(requestResetPassword.fulfilled, () => {
			notification.success(NotificationMessage.LINK_SENT);
		});

		builder.addCase(resetPassword.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.user = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(resetPassword.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
