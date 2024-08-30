import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserDto,
	type UserGetParametersDto,
	type UserUpdatePayload,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const getById = createAsyncThunk<
	UserDto,
	UserGetParametersDto,
	AsyncThunkConfig
>(`${sliceName}/get`, async (payload, { extra }) => {
	const { usersApi } = extra;
	const { id } = payload;

	return await usersApi.getById(id);
});

const update = createAsyncThunk<UserDto, UserUpdatePayload, AsyncThunkConfig>(
	`${sliceName}/update`,
	async (payload, { extra }) => {
		const { usersApi } = extra;
		const { data, id } = payload;

		return await usersApi.update(id, data);
	},
);

export { getById, update };
