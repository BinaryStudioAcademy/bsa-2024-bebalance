import React from "react";
import { StyleSheet } from "react-native";

import {
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { DataStatus, RootScreenName } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppRoute,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/packages/users/users";
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

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
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
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
					]}
				>
					<View style={[globalStyles.p32, styles.formContainer]}>
						<Text>state: {dataStatus}</Text>
						<View
							style={[
								globalStyles.gap8,
								globalStyles.alignItemsCenter,
								globalStyles.flexDirectionRow,
								globalStyles.mb32,
								globalStyles.mt32,
							]}
						>
							<View style={styles.logo}></View>
							<Text preset="heading" size="xl">
								LOGO
							</Text>
						</View>
						{getScreen(name)}
					</View>
				</View>
			</ScreenWrapper>
		</LoaderWrapper>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: "#fff",
		borderRadius: 25,
		height: "80%",
		width: "90%",
	},
	logo: {
		//temp
		backgroundColor: "red",
		borderRadius: 16.5,
		height: 34,
		width: 34,
	},
});

export { Auth };
