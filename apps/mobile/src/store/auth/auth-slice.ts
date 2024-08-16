import { createSlice } from '@reduxjs/toolkit';

import type { SignInRequestDto, UserDto } from '@app/types/types';
import { createAppAsyncThunk } from '../helpers/create-app-async-thunk';
import type { RootState } from '../store';

interface AuthState {
	user: UserDto | null;
}

const initialState: AuthState = {
	user: null,
};

const signIn = createAppAsyncThunk<
	{ user: UserDto },
	Omit<SignInRequestDto, 'strategy'>
>(`/signIn`, payload => {
	const { login, password } = payload;
	const user = { id: 1, email: login, password };

	return { user };
});

const signOut = createAppAsyncThunk(`/signOut`, () => {
	const user = null;

	return { user };
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
	},
});

const { reducer } = authSlice;

const selectIsAuthenticated = (state: RootState) => {
	return !!state.auth.user;
};

export { reducer, signIn, signOut, selectIsAuthenticated };
