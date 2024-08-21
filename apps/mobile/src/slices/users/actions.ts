import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserGetAllItemResponseDto,
	type UserGetAllResponseDto,
} from "~/packages/users/users";

import { name as sliceName } from "./users.slice";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll();
});

const getAuthenticatedUser = createAsyncThunk<
	UserGetAllItemResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (userId, { extra }) => {
	const { userApi } = extra;

	return await userApi.getAuthenticatedUser(userId);
});

export { getAuthenticatedUser, loadAll };
