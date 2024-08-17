import {
	configureStore,
	type ThunkMiddleware,
	Tuple,
	UnknownAction,
} from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums";
import { authApi } from "~/packages/auth/auth";
import { userApi } from "~/packages/users/users";
import { reducer as authReducer } from "~/slices/auth/auth";
import { reducer as usersReducer } from "~/slices/users/users";

import { type Config } from "../config/config";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	userApi: typeof userApi;
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
				});
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
			userApi,
		};
	}
}

export { Store };
