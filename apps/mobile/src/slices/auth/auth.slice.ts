import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";
import { type UserDto } from "~/packages/users/users";

import {
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	resetPassword,
	signIn,
	signOut,
	signUp,
} from "./actions";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	isDeepLinkBeingChecked: boolean;
	user: null | UserDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	isDeepLinkBeingChecked: false,
	user: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(checkIsResetPasswordExpired.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(checkIsResetPasswordExpired.fulfilled, (state) => {
			state.isDeepLinkBeingChecked = false;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(checkIsResetPasswordExpired.rejected, (state) => {
			state.isDeepLinkBeingChecked = false;
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(resetPassword.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(resetPassword.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(resetPassword.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {
		startCheckingDeepLink(state) {
			state.isDeepLinkBeingChecked = true;
		},
	},
});

export { actions, name, reducer };
