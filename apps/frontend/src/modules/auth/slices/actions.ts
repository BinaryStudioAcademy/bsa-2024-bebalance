import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signIn = createAsyncThunk<
	UserDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
	const { authApi } = extra;

	const { token, user } = await authApi.signIn(signInPayload);

	void storage.set(StorageKey.TOKEN, token);

	return user;
});

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/sign-up`,
	async (registerPayload, { extra, rejectWithValue }) => {
		const { authApi } = extra;

		try {
			const { token, user } = await authApi.signUp(registerPayload);

			void storage.set(StorageKey.TOKEN, token);

			return user;
		} catch (error) {
			const errorMessage = (error as Error).message;

			return rejectWithValue(errorMessage || "sign-up failed");
		}
	},
);

const getAuthenticatedUser = createAsyncThunk<
	UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { authApi } = extra;

	return await authApi.getAuthenticatedUser();
});

export { getAuthenticatedUser, signIn, signUp };
