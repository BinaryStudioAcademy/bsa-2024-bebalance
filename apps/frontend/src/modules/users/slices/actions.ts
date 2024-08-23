import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const getAuthenticatedUser = createAsyncThunk<
	UserDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getAuthenticatedUser();
});

export { getAuthenticatedUser };
