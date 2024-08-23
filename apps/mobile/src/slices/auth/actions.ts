import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserDto,
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
	const response: UserDto = await authApi.getAuthenticatedUser();

	return response;
});

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
	const { authApi } = extra;

	const response: UserSignUpResponseDto = await authApi.signUp(signUpPayload);
	await storage.set(StorageKey.TOKEN, response.token);

	return response.user;
});

export { getAuthenticatedUser, signUp };
