import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserDto, type UserUpdatePayload } from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const getUserFromAuth = createAsyncThunk<UserDto, undefined, AsyncThunkConfig>(
	`${sliceName}/get`,
	(_, { getState }) => {
		return getState().auth.user as UserDto;
	},
);

const update = createAsyncThunk<UserDto, UserUpdatePayload, AsyncThunkConfig>(
	`${sliceName}/update`,
	async (payload, { extra }) => {
		const { notification, usersApi } = extra;
		const { data, id } = payload;

		const response = await usersApi.update(id, data);
		notification.success(NotificationMessage.PROFILE_UPDATED);

		return response;
	},
);

export { getUserFromAuth, update };
