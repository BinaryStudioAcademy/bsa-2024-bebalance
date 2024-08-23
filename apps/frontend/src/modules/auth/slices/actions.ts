import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signIn = createAsyncThunk<
	UserSignInResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
	const { authApi } = extra;

	const response = await authApi.signIn(signInPayload);

	void storage.set(StorageKey.TOKEN, response.token);

	return response;
});

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi } = extra;

	const response = await authApi.signUp(registerPayload);

	void storage.set(StorageKey.TOKEN, response.token);

	return response;
});

export { signIn, signUp };
