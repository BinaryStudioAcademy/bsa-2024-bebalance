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

const sendResetPasswordLink = createAsyncThunk<
	null,
	EmailDto,
	AsyncThunkConfig
>(`${sliceName}/send-reset-password-link`, async (emailPayload, { extra }) => {
	const { authApi } = extra;

	try {
		await authApi.sendResetPasswordLink(emailPayload);

		return null;
	} catch (error) {
		throw error as Error;
	}
});

const resetPassword = createAsyncThunk<
	null,
	Omit<ResetPasswordDto, "confirmPassword">,
	AsyncThunkConfig
>(`${sliceName}/reset-password`, async (emailPayload, { extra }) => {
	const { authApi } = extra;

	try {
		await authApi.resetPassword(emailPayload);

		return null;
	} catch (error) {
		throw error as Error;
	}
});

export {
	getAuthenticatedUser,
	resetPassword,
	sendResetPasswordLink,
	signIn,
	signUp,
};
