import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";

import { name as sliceName } from "./app.slice";

const updateInitialNotificationId = createAsyncThunk<
	null | string,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
	const { expiredTaskNotification } = extra;

	const initialNotification = await expiredTaskNotification.getInitial();

	return initialNotification?.notification.android?.channelId ?? null;
});

export { updateInitialNotificationId };
