import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserDto } from "~/modules/users/users.js";

import { type UserPreferencesRequestDto } from "../libs/types/types.js";
import { name as sliceName } from "./users.slice.js";

const saveUserPreferences = createAsyncThunk<
	UserDto,
	UserPreferencesRequestDto,
	AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra }) => {
	const { usersApi } = extra;

	return await usersApi.saveUserPreferences(payload);
});

export { saveUserPreferences };
