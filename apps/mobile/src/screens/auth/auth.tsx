import React from "react";

import {
	BackgroundWrapper,
	KeyboardAvoidingView,
	LoaderWrapper,
	Planet,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { DataStatus, RootScreenName } from "~/libs/enums/enums";
import { getIsIos } from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppRoute,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type UserSignUpRequestDto } from "~/packages/users/users";
import { actions as authActions } from "~/slices/auth/auth";
import { actions as userActions } from "~/slices/users/users";

import { SignInForm, SignUpForm } from "./components/components";
import { styles } from "./styles";

const IOS_KEYBOARD_OFFSET = 40;
const ANDROID_KEYBOARD_OFFSET = 0;
const isIos = getIsIos();

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

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case RootScreenName.SIGN_IN: {
				return <SignInForm onSubmit={() => {}} />;
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
						style={[globalStyles.flex1, globalStyles.mv32]}
					>
						<ScrollView
							contentContainerStyle={[
								globalStyles.justifyContentCenter,
								globalStyles.ph16,
								styles.wideView,
							]}
							overScrollMode="never"
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						>
							<Text>
								state: {dataStatus}
								{JSON.stringify(user)}
							</Text>
							<View
								style={[
									globalStyles.pv32,
									globalStyles.ph16,
									styles.formContainer,
								]}
							>
								<View
									style={[
										globalStyles.gap8,
										globalStyles.alignItemsCenter,
										globalStyles.flexDirectionRow,
										globalStyles.mb32,
									]}
								>
									<Planet color="pink" size="xs" />
									<Text
										preset="uppercase"
										size="xl"
										style={globalStyles.ml48}
										weight="bold"
									>
										Logo
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
