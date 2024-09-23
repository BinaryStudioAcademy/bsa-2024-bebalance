import {
	configureStore,
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums";
import { authApi } from "~/packages/auth/auth";
import { onboardingApi } from "~/packages/onboarding/onboarding";
import { quizApi } from "~/packages/quiz/quiz";
import { tasksApi } from "~/packages/tasks/tasks";
import { userApi } from "~/packages/users/users";
import { reducer as authReducer } from "~/slices/auth/auth";
import { reducer as onboardingReducer } from "~/slices/onboarding/onboarding";
import { reducer as quizReducer } from "~/slices/quiz/quiz";
import { reducer as tasksReducer } from "~/slices/task/task";
import { reducer as usersReducer } from "~/slices/users/users";

import { type Config } from "../config/config";
import { handleErrorMiddleware } from "./middleware/handle-error.middleware";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	onboarding: ReturnType<typeof onboardingReducer>;
	quiz: ReturnType<typeof quizReducer>;
	tasks: ReturnType<typeof tasksReducer>;
	users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	onboardingApi: typeof onboardingApi;
	quizApi: typeof quizApi;
	tasksApi: typeof tasksApi;
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
				onboarding: onboardingReducer,
				quiz: quizReducer,
				tasks: tasksReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			onboardingApi,
			quizApi,
			tasksApi,
			userApi,
		};
	}
}

export { Store };
