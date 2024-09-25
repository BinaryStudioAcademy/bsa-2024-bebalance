import React from "react";

import {
	Button,
	IconButton,
	Input,
	Link,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, DataStatus, RootScreenName } from "~/libs/enums/enums";
import { getSecurityInputIconName } from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppForm,
	useAppRoute,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigation,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
	type RouteProp,
} from "~/libs/types/types";
import {
	type ResetPasswordDto,
	type ResetPasswordFormDto,
	userResetPasswordValidationSchema,
} from "~/packages/users/users";
import { actions as authActions } from "~/slices/auth/auth";

import { ConfirmPasswordCustomValidation } from "../../enums/enums";
import { RESET_PASSWORD_FORM_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: ResetPasswordDto) => void;
};

const INPUT_ICON_SIZE = 20;

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isNewPasswordHidden, setIsNewPasswordHidden] = useState<boolean>(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] =
		useState<boolean>(true);

	const { params } = useAppRoute() as RouteProp<
		RootNavigationParameterList,
		typeof RootScreenName.RESET_PASSWORD
	>;
	const { token } = params;

	const { dataStatus, isDeepLinkBeingChecked } = useAppSelector(
		(state) => state.auth,
	);
	const dispatch = useAppDispatch();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();

	const { control, errors, getValues, handleSubmit, setError } =
		useAppForm<ResetPasswordFormDto>({
			defaultValues: RESET_PASSWORD_FORM_DEFAULT_VALUES,
			validationSchema: userResetPasswordValidationSchema,
		});

	const handlePasswordIconPress = useCallback((): void => {
		setIsNewPasswordHidden(!isNewPasswordHidden);
	}, [isNewPasswordHidden]);

	const handleConfirmPasswordIconPress = useCallback((): void => {
		setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
	}, [isConfirmPasswordHidden]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit((resetPasswordSubmissionData: ResetPasswordFormDto) => {
			const { newPassword } = resetPasswordSubmissionData;
			const confirmPassword = getValues("confirmPassword");

			if (confirmPassword === newPassword) {
				onSubmit({ jwtToken: token, newPassword });
			} else {
				setError(ConfirmPasswordCustomValidation.FIELD.CONFIRM_PASSWORD, {
					message: ConfirmPasswordCustomValidation.ERROR_MESSAGE,
					type: ConfirmPasswordCustomValidation.ERROR_TYPE,
				});
			}
		})();
	}, [getValues, handleSubmit, onSubmit, setError, token]);

	useEffect(() => {
		if (isDeepLinkBeingChecked) {
			void dispatch(authActions.checkIsResetPasswordExpired({ token }));
		}
	}, [dispatch, isDeepLinkBeingChecked, token]);

	useEffect(() => {
		if (dataStatus === DataStatus.REJECTED) {
			navigation.navigate(RootScreenName.FORGOT_PASSWORD);
		}
	}, [dataStatus, navigation]);

	return (
		<>
			<Text preset="uppercase" size="xl" weight="bold">
				RESET PASSWORD
			</Text>
			<Input
				accessoryRight={
					<IconButton
						iconColor={BaseColor.LIGHT_GRAY}
						iconSize={INPUT_ICON_SIZE}
						name={getSecurityInputIconName(isNewPasswordHidden)}
						onPress={handlePasswordIconPress}
					/>
				}
				control={control}
				errors={errors}
				isSecureTextEntry={isNewPasswordHidden}
				label="New password"
				name="newPassword"
				placeholder="*******"
			/>
			<Input
				accessoryRight={
					<IconButton
						iconColor={BaseColor.LIGHT_GRAY}
						iconSize={INPUT_ICON_SIZE}
						name={getSecurityInputIconName(isConfirmPasswordHidden)}
						onPress={handleConfirmPasswordIconPress}
					/>
				}
				control={control}
				errors={errors}
				isSecureTextEntry={isConfirmPasswordHidden}
				label="Confirm password"
				name="confirmPassword"
				placeholder="*******"
			/>
			<Button label="SAVE PASSWORD" onPress={handleFormSubmit} />
			<View style={globalStyles.alignItemsCenter}>
				<Text style={globalStyles.mb16} weight="semiBold">
					Back to{" "}
					<Link
						color={BaseColor.BLUE}
						label="Sign in"
						to={`/${RootScreenName.SIGN_IN}`}
						weight="semiBold"
					/>
				</Text>
			</View>
		</>
	);
};

export { ResetPasswordForm };
