import React from "react";

import {
	LoaderWrapper,
	ScreenWrapper,
	Text,
} from "~/libs/components/components";
import { DataStatus, RootScreenName } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppRoute,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks";
import { type UserSignUpRequestDto } from "~/packages/users/users";
import { actions as authActions } from "~/slices/auth/auth";
import { actions as userActions } from "~/slices/users/users";

import { SignInForm, SignUpForm } from "./components/components";

const Auth: React.FC = () => {
	const { name } = useAppRoute();
	const dispatch = useAppDispatch();
	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
	}));

	const isSignUpScreen = name === RootScreenName.SIGN_UP;

	useEffect(() => {
		if (isSignUpScreen) {
			void dispatch(userActions.loadAll());
		}
	}, [isSignUpScreen, dispatch]);

	const handleSignInSubmit = useCallback(() => {
		// TODO: handle sign in
	}, []);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[],
	);

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case RootScreenName.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}
			case RootScreenName.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<ScreenWrapper>
				<Text>state: {dataStatus}</Text>
				{getScreen(name)}
			</ScreenWrapper>
		</LoaderWrapper>
	);
};

export { Auth };
