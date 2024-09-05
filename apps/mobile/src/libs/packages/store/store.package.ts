import {
	configureStore,
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums";
import { authApi } from "~/packages/auth/auth";
import { categoriesApi } from "~/packages/categories/categories";
import { userApi } from "~/packages/users/users";
import { reducer as authReducer } from "~/slices/auth/auth";
import { reducer as categoriesReducer } from "~/slices/categories/categories";
import { reducer as usersReducer } from "~/slices/users/users";

import { type Config } from "../config/config";
import { handleErrorMiddleware } from "./middleware/handle-error.middleware";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	categories: ReturnType<typeof categoriesReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	categoriesApi: typeof categoriesApi;
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
				}).prepend([handleErrorMiddleware]);
			},
			reducer: {
				auth: authReducer,
				categories: categoriesReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			categoriesApi,
			userApi,
		};
	}
}

export { Store };
