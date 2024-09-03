import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import { usersApi, reducer as usersReducer } from "~/modules/users/users.js";

import { handleErrorMiddleware } from "./handle-error.middleware.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	notification: typeof notification;
	storage: typeof storage;
	usersApi: typeof usersApi;
};

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend([handleErrorMiddleware]);
			},
			reducer: {
				auth: authReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			notification,
			storage,
			usersApi,
		};
	}
}

export { Store };
