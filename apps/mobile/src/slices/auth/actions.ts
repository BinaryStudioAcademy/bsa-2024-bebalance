import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootScreenName } from "~/libs/enums/enums";
import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type EmailDto,
	type ResetPasswordDto,
	type ResetPasswordLinkDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/packages/users/users";
import { actions as appActions } from "~/slices/app/app";

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

const resetPassword = createAsyncThunk<
	boolean,
	ResetPasswordDto,
	AsyncThunkConfig
>(`${sliceName}/reset-password`, async (emailPayload, { dispatch, extra }) => {
	const { authApi } = extra;

	const isSuccessful = await authApi.resetPassword(emailPayload);

	if (isSuccessful) {
		dispatch(appActions.changeLink(RootScreenName.SIGN_IN));
	}

	return isSuccessful;
});

const checkIsResetPasswordExpired = createAsyncThunk<
	boolean,
	ResetPasswordLinkDto,
	AsyncThunkConfig
>(`${sliceName}/check-reset-password-link`, async (payload, { extra }) => {
	const { authApi } = extra;

	return await authApi.checkIsResetPasswordExpired(payload);
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

export {
	checkIsResetPasswordExpired,
	getAuthenticatedUser,
	requestResetPassword,
	resetPassword,
	signIn,
	signOut,
	signUp,
};
