import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserGetAllItemResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/packages/users/users";

import { name as sliceName } from "./auth.slice";

const getAuthenticatedUser = createAsyncThunk<
	UserGetAllItemResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { authApi } = extra;
	const response: UserGetAllItemResponseDto =
		await authApi.getAuthenticatedUser();
	await storage.set(StorageKey.USER, JSON.stringify(response));

	return response;
});

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, (signUpPayload, { extra }) => {
	const { authApi } = extra;

	return authApi.signUp(signUpPayload);
});

export { getAuthenticatedUser, signUp };
