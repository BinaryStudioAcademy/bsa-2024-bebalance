import { createSlice } from "@reduxjs/toolkit";

import type {
	UserSignUpRequestDto,
	UserSignUpResponseDto,
} from "~/app/types/types";
import { createAppAsyncThunk } from "../helpers/helpers";

interface AuthState {
	user: UserSignUpResponseDto | null;
}

const initialState: AuthState = {
	user: null,
};

const signUp = createAppAsyncThunk<
	{ user: UserSignUpResponseDto },
	UserSignUpRequestDto
>(`/signIn`, (payload) => {
	const { email, password } = payload;
	const user = { id: 1, email, password };

	return { user };
});

const signOut = createAppAsyncThunk(`/signOut`, () => {
	const user = null;

	return { user };
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
	},
});

const { reducer } = authSlice;

export { reducer, signUp, signOut };
