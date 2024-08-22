import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/packages/users/users";

import { name as sliceName } from "./auth.slice";

const signIn = createAsyncThunk<
	UserSignInResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
	const { authApi } = extra;

	const response: UserSignInResponseDto = await authApi.signIn(signInPayload);

	if (response.token) {
		await storage.set(StorageKey.TOKEN, response.token);
	}

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

export { signIn, signUp };
