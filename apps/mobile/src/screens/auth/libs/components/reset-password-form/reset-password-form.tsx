import {
	Button,
	IconButton,
	Input,
	Link,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { getSecurityInputIconName } from "~/libs/helpers/helpers";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type ResetPasswordDto,
	type ResetPasswordFormDto,
	userResetPasswordValidationSchema,
} from "~/packages/users/users";

import { ConfirmPasswordCustomValidation } from "../../enums/enums";
import { RESET_PASSWORD_FORM_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: Omit<ResetPasswordDto, "jwtToken">) => void;
};

const INPUT_ICON_SIZE = 20;

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const [isNewPasswordHidden, setIsNewPasswordHidden] = useState<boolean>(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] =
		useState<boolean>(true);

	const { control, errors, handleSubmit, setError, watch } =
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
			const confirmPassword = watch(ConfirmPasswordCustomValidation.FIELD);

			if (confirmPassword === newPassword) {
				onSubmit({ newPassword });
			} else {
				setError(ConfirmPasswordCustomValidation.FIELD, {
					message: ConfirmPasswordCustomValidation.ERROR_MESSAGE,
					type: ConfirmPasswordCustomValidation.ERROR_TYPE,
				});
			}
		})();
	}, [handleSubmit, onSubmit, setError, watch]);

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
			<Button label="RESET PASSWORD" onPress={handleFormSubmit} />
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
