import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type EmailDto,
	type ResetPasswordDto,
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
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi } = extra;

	const { token, user } = await authApi.signUp(registerPayload);

	void storage.set(StorageKey.TOKEN, token);

	return user;
});

const getAuthenticatedUser = createAsyncThunk<
	UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { authApi } = extra;

	return await authApi.getAuthenticatedUser();
});

const requestResetPassword = createAsyncThunk<null, EmailDto, AsyncThunkConfig>(
	`${sliceName}/send-reset-password-link`,
	async (emailPayload, { extra }) => {
		const { authApi } = extra;

		await authApi.requestResetPassword(emailPayload);

		return null;
	},
);

const resetPassword = createAsyncThunk<
	null,
	ResetPasswordDto,
	AsyncThunkConfig
>(`${sliceName}/reset-password`, async (emailPayload, { extra }) => {
	const { authApi } = extra;

	await authApi.resetPassword(emailPayload);

	return null;
});

export {
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
};
