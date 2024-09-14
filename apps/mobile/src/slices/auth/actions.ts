import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type EmailDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/packages/users/users";

import { name as sliceName } from "./auth.slice";

const getAuthenticatedUser = createAsyncThunk<
	null | UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { authApi } = extra;
	const hasToken = await storage.has(StorageKey.TOKEN);

	if (!hasToken) {
		return null;
	}

	return await authApi.getAuthenticatedUser();
});

const requestResetPassword = createAsyncThunk<
	boolean,
	EmailDto,
	AsyncThunkConfig
>(`${sliceName}/send-reset-password-link`, async (emailPayload, { extra }) => {
	const { authApi } = extra;

	return await authApi.requestResetPassword(emailPayload);
});

const signIn = createAsyncThunk<
	UserDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
	const { authApi } = extra;

	const { token, user } = await authApi.signIn(signInPayload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
	const { authApi } = extra;

	const { token, user } = await authApi.signUp(signUpPayload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const signOut = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/sign-out`,
	async () => {
		await storage.drop(StorageKey.TOKEN);

		return null;
	},
);

export { getAuthenticatedUser, requestResetPassword, signIn, signOut, signUp };
