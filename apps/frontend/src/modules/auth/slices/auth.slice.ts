import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import {
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	logOut,
	resetPassword,
	signIn,
	signUp,
	updatePassword,
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

		builder.addCase(resetPassword.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(resetPassword.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(resetPassword.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(logOut.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(checkIsResetPasswordExpired.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(checkIsResetPasswordExpired.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(checkIsResetPasswordExpired.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(updatePassword.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updatePassword.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updatePassword.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {
		updateAuthUser(state, action: PayloadAction<UserDto>) {
			state.user = action.payload;
		},
		updateCompletionTasksPercentageState(state, action: PayloadAction<number>) {
			if (state.user) {
				state.user.completionTasksPercentage = action.payload;
			}
		},
		updateOnboardingAnsweredState(state) {
			if (state.user) {
				state.user.hasAnsweredOnboardingQuestions = true;
			}
		},
		updateQuizAnsweredState(state) {
			if (state.user) {
				state.user.hasAnsweredQuizQuestions = true;
			}
		},
	},
});

export { actions, name, reducer };
