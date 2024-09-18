import {
	configureStore,
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums";
import { toastMessage } from "~/libs/packages/toast-message/toast-message";
import { authApi } from "~/packages/auth/auth";
import { onboardingApi } from "~/packages/onboarding/onboarding";
import { quizApi } from "~/packages/quiz/quiz";
import { userApi } from "~/packages/users/users";
import { reducer as appReducer } from "~/slices/app/app";
import { reducer as authReducer } from "~/slices/auth/auth";
import { reducer as onboardingReducer } from "~/slices/onboarding/onboarding";
import { reducer as quizReducer } from "~/slices/quiz/quiz";
import { reducer as usersReducer } from "~/slices/users/users";

import { type Config } from "../config/config";
import { handleErrorMiddleware } from "./middleware/handle-error.middleware";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	onboarding: ReturnType<typeof onboardingReducer>;
	quiz: ReturnType<typeof quizReducer>;
	users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	onboardingApi: typeof onboardingApi;
	quizApi: typeof quizApi;
	toastMessage: typeof toastMessage;
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
				app: appReducer,
				auth: authReducer,
				onboarding: onboardingReducer,
				quiz: quizReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			onboardingApi,
			quizApi,
			toastMessage,
			userApi,
		};
	}
}

export { Store };
