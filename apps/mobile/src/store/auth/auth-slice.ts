import { createSlice } from "@reduxjs/toolkit";

import type { SignUpRequestDto, UserDto } from "~/app/types/types";
import { createAppAsyncThunk } from "../helpers/helpers";
import type { RootState } from "../store";

interface AuthState {
	user: UserDto | null;
}

const initialState: AuthState = {
	user: null,
};

const signUp = createAppAsyncThunk<{ user: UserDto }, SignUpRequestDto>(
	`/signIn`,
	(payload) => {
		const { login, password } = payload;
		const user = { id: 1, email: login, password };

		return { user };
	},
);

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

const selectIsAuthenticated = (state: RootState) => {
	return Boolean(state.auth.user);
};

export { reducer, signUp, signOut, selectIsAuthenticated };
