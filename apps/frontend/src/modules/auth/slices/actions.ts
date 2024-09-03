import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
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
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signIn(signInPayload);

	void storage.set(StorageKey.TOKEN, token);

	return user;
});

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;
	const { token, user } = await authApi.signUp(registerPayload);
	void storage.set(StorageKey.TOKEN, token);

	return user;
});

const logOut = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/log-out`,
	async (_, { extra }) => {
		const { storage } = extra;
		await storage.drop(StorageKey.TOKEN);

		return null;
	},
);

const getAuthenticatedUser = createAsyncThunk<
	null | UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { authApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

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
	const { authApi, notification } = extra;

	const isSuccessful = await authApi.requestResetPassword(emailPayload);

	if (isSuccessful) {
		notification.success(NotificationMessage.LINK_SENT);
	}

	return isSuccessful;
});

const resetPassword = createAsyncThunk<
	UserDto,
	ResetPasswordDto,
	AsyncThunkConfig
>(`${sliceName}/reset-password`, async (emailPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.resetPassword(emailPayload);

	void storage.set(StorageKey.TOKEN, token);

	return user;
});

export {
	getAuthenticatedUser,
	logOut,
	requestResetPassword,
	resetPassword,
	signIn,
	signUp,
};
