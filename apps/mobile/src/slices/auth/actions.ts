import { createAsyncThunk } from "@reduxjs/toolkit";

import { storage, StorageKey } from "~/libs/packages/storage/storage";
import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserDto,
	type UserSignUpRequestDto,
} from "~/packages/users/users";

import { name as sliceName } from "./auth.slice";

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

export { signUp };
