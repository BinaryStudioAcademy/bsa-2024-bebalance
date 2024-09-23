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
	`${sliceName}/save-notification-answers`,
	async (payload, { dispatch, extra }) => {
		const { usersApi } = extra;

		const updatedUser = await usersApi.saveNotificationAnswers(payload);
		dispatch(authActions.updateAuthUser(updatedUser));

		return updatedUser;
	},
);

const update = createAsyncThunk<UserDto, UserUpdatePayload, AsyncThunkConfig>(
	`${sliceName}/update`,
	async (payload, { dispatch, extra }) => {
		const { notification, usersApi } = extra;
		const { data, id } = payload;

		const response = await usersApi.update(id, data);
		dispatch(authActions.updateAuthUser(response));
		notification.success(NotificationMessage.PROFILE_UPDATED);

		return response;
	},
);

const uploadAvatar = createAsyncThunk<UserDto, FormData, AsyncThunkConfig>(
	`${sliceName}/upload-avatar`,
	async (payload, { dispatch, extra }) => {
		const { notification, usersApi } = extra;

		const response = await usersApi.uploadAvatar(payload);
		dispatch(authActions.updateAuthUser(response));
		notification.success(NotificationMessage.AVATAR_UPLOADED);

		return response;
	},
);

export { getById, saveNotificationAnswers, update, uploadAvatar };
