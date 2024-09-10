import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import {
	type UserDto,
	type UserGetParametersDto,
} from "~/packages/users/users";

import { name as sliceName } from "./users.slice";

const getById = createAsyncThunk<
	UserDto,
	UserGetParametersDto,
	AsyncThunkConfig
>(`${sliceName}/get-by-id`, (payload, { extra }) => {
	const { userApi } = extra;
	const { id } = payload;

	return userApi.getById(id);
});

export { getById };
