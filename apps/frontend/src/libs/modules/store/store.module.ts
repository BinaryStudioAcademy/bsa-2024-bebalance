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
import {
	categoriesApi,
	reducer as categoriesReducer,
} from "~/modules/categories/categories.js";
import {
	onboardingApi,
	reducer as onboardingReducer,
} from "~/modules/onboarding/onboarding.js";
import { quizApi, reducer as quizReducer } from "~/modules/quiz/quiz.js";
import { usersApi, reducer as usersReducer } from "~/modules/users/users.js";

import { handleErrorMiddleware } from "./handle-error.middleware.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	categories: ReturnType<typeof categoriesReducer>;
	onboarding: ReturnType<typeof onboardingReducer>;
	quiz: ReturnType<typeof quizReducer>;
	users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	categoriesApi: typeof categoriesApi;
	notification: typeof notification;
	onboardingApi: typeof onboardingApi;
	quizApi: typeof quizApi;
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
				categories: categoriesReducer,
				onboarding: onboardingReducer,
				quiz: quizReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			categoriesApi,
			notification,
			onboardingApi,
			quizApi,
			storage,
			usersApi,
		};
	}
}

export { Store };
