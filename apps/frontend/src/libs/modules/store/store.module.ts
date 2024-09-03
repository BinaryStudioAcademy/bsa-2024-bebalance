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
import { quizApi, reducer as quizReducer } from "~/modules/quiz/quiz.js";

import { handleErrorMiddleware } from "./handle-error.middleware.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	quiz: ReturnType<typeof quizReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	notification: typeof notification;
	quizApi: typeof quizApi;
	storage: typeof storage;
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
				quiz: quizReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			notification,
			quizApi,
			storage,
		};
	}
}

export { Store };
