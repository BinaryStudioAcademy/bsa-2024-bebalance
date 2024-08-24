import React from "react";

import {
	BackgroundWrapper,
	KeyboardAvoidingView,
	LoaderWrapper,
	Platform,
	ScreenWrapper,
	ScrollView,
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
import { styles } from "./styles";

const IOS_KEYBOARD_OFFSET = 40;
const ANDROID_KEYBOARD_OFFSET = 0;
const isIos = Platform.OS === "ios";

const Auth: React.FC = () => {
	const { name } = useAppRoute();
	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
		user: auth.user,
	}));

	const isSignUpScreen = name === RootScreenName.SIGN_UP;

	useEffect(() => {
		if (isSignUpScreen) {
			void dispatch(userActions.loadAll());
		}
	}, [isSignUpScreen, dispatch]);

	useEffect(() => {
		if (!user) {
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [user]);

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
			<BackgroundWrapper>
				<ScreenWrapper>
					<KeyboardAvoidingView
						behavior={isIos ? "padding" : "height"}
						keyboardVerticalOffset={
							isIos ? IOS_KEYBOARD_OFFSET : ANDROID_KEYBOARD_OFFSET
						}
						style={[
							globalStyles.alignItemsCenter,
							globalStyles.flex1,
							globalStyles.justifyContentCenter,
							globalStyles.mb48,
							globalStyles.mt48,
						]}
					>
						<ScrollView
							contentContainerStyle={globalStyles.flexGrow1}
							overScrollMode="never"
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							style={styles.formContainer}
						>
							<View style={[globalStyles.p32]}>
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
									<Text preset="heading" style={globalStyles.ml48}>
										LOGO
									</Text>
								</View>
								{getScreen(name)}
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Auth };
