import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserDto,
	type UserGetParametersDto,
	type UserUpdatePayload,
} from "~/modules/users/users.js";

import { type NotificationAnswersPayloadDto } from "../libs/types/types.js";
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

const saveNotificationAnswers = createAsyncThunk<
	UserDto,
	NotificationAnswersPayloadDto,
	AsyncThunkConfig
>(
	`${sliceName}/saveNotificationAnswers`,
	async (payload, { dispatch, extra }) => {
		const { usersApi } = extra;

		const updatedUser = await usersApi.saveNotificationAnswers(payload);
		dispatch(authActions.setUpdatedAuthUser(updatedUser));

		return updatedUser;
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

export { getById, saveNotificationAnswers, update };
