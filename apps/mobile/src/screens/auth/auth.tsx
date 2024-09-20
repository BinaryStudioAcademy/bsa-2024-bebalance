import React from "react";

import {
	BackgroundWrapper,
	KeyboardAvoidingView,
	LoaderWrapper,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { Logo } from "~/libs/components/logo/logo";
import { DataStatus, RootScreenName } from "~/libs/enums/enums";
import { checkIfAndroid, checkIfIos } from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppRoute,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigation,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";
import {
	type EmailDto,
	type ResetPasswordDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/packages/users/users";
import { actions as authActions } from "~/slices/auth/auth";

import {
	ForgotPasswordForm,
	ResetPasswordForm,
	SignInForm,
	SignUpForm,
} from "./libs/components/components";
import { styles } from "./styles";

const IOS_KEYBOARD_OFFSET = 40;
const ANDROID_KEYBOARD_OFFSET = 0;

const Auth: React.FC = () => {
	const { name, params } = useAppRoute();

	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector((state) => state.auth);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();

	const { token: resetPasswordToken = "" } = (params ?? {}) as {
		token: string;
	};

	useEffect(() => {
		if (!user) {
			void dispatch(authActions.getAuthenticatedUser());
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (resetPasswordToken) {
			void dispatch(
				authActions.checkIsResetPasswordExpired({ token: resetPasswordToken }),
			);
		}
	}, [dispatch, resetPasswordToken]);

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

	const handleForgotPasswordSubmit = useCallback(
		(payload: EmailDto): void => {
			void dispatch(authActions.requestResetPassword(payload));
			navigation.navigate(RootScreenName.SIGN_IN);
		},
		[dispatch, navigation],
	);

	const handleResetPasswordSubmit = useCallback(
		(payload: Omit<ResetPasswordDto, "jwtToken">): void => {
			void dispatch(
				authActions.resetPassword({
					jwtToken: resetPasswordToken,
					newPassword: payload.newPassword,
				}),
			);
			navigation.navigate(RootScreenName.SIGN_IN);
		},
		[dispatch, navigation, resetPasswordToken],
	);

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case RootScreenName.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case RootScreenName.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}

			case RootScreenName.RESET_PASSWORD: {
				return <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />;
			}

			case RootScreenName.FORGOT_PASSWORD: {
				return <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />;
			}
		}

		return null;
	};

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<BackgroundWrapper
				planetLayout={name === RootScreenName.SIGN_IN ? "signIn" : "signUp"}
			>
				<ScreenWrapper>
					<KeyboardAvoidingView
						behavior={checkIfAndroid() ? "height" : "padding"}
						keyboardVerticalOffset={
							checkIfIos() ? IOS_KEYBOARD_OFFSET : ANDROID_KEYBOARD_OFFSET
						}
						style={[globalStyles.flex1, globalStyles.mv32]}
					>
						<ScrollView
							contentContainerStyle={[
								globalStyles.justifyContentCenter,
								globalStyles.ph16,
								styles.wideView,
							]}
							keyboardShouldPersistTaps="handled"
							overScrollMode="never"
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						>
							<View
								style={[
									globalStyles.pv32,
									globalStyles.ph16,
									styles.formContainer,
								]}
							>
								<View
									style={[
										globalStyles.gap12,
										globalStyles.alignItemsCenter,
										globalStyles.flexDirectionRow,
										globalStyles.mb32,
									]}
								>
									<Logo />
									<Text preset="subheading" size="xl" weight="bold">
										BeBalance
									</Text>
								</View>
								<View style={globalStyles.gap24}>{getScreen(name)}</View>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Auth };
