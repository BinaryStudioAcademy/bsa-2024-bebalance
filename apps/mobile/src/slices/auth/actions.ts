import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/packages/users/users";

import { name as sliceName } from "./auth.slice";

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, (signUpPayload, { extra }) => {
	const { authApi } = extra;

	return authApi.signUp(signUpPayload);
});

export { signUp };
