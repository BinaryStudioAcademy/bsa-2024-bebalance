import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserDto,
	type UserGetParametersDto,
	type UserUpdatePayload,
} from "~/modules/users/users.js";

import { type FinalAnswersRequestDto } from "../libs/types/types.js";
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

const saveFinalAnswers = createAsyncThunk<
	UserDto,
	FinalAnswersRequestDto,
	AsyncThunkConfig
>(`${sliceName}/saveFinalAnswers`, async (payload, { extra }) => {
	const { usersApi } = extra;

	return await usersApi.saveFinalAnswers(payload);
});

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

export { getById, saveFinalAnswers, update };
