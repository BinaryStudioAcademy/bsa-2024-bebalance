import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserGetAllItemResponseDto,
	type UserGetAllResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll();
});

const getUser = createAsyncThunk<
	UserGetAllItemResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get_user`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getUser();
});

export { getUser, loadAll };
