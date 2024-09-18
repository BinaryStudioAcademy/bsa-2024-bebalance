import React from "react";

import {
	Button,
	IconButton,
	Input,
	Link,
	Text,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { getSecurityInputIconName } from "~/libs/helpers/helpers";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/packages/users/users";

import { USER_SIGN_UP_DEFAULT_VALUES } from "./libs/constants";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const INPUT_ICON_SIZE = 20;

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] =
		useState<boolean>(true);

	const handlePasswordIconPress = useCallback((): void => {
		setIsPasswordHidden(!isPasswordHidden);
	}, [isPasswordHidden]);

	const handleConfirmPasswordIconPress = useCallback((): void => {
		setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
	}, [isConfirmPasswordHidden]);

	const { control, errors, handleSubmit, setError, watch } =
		useAppForm<UserSignUpFormDto>({
			defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
			validationSchema: userSignUpValidationSchema,
		});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit((signUpSubmissionData: UserSignUpFormDto) => {
			const { password } = signUpSubmissionData;
			const confirmPassword = watch(ConfirmPasswordCustomValidation.FIELD);

			if (confirmPassword === password) {
				onSubmit(signUpSubmissionData);
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
				CREATE AN ACCOUNT
			</Text>
			<Text style={globalStyles.mb16} weight="semiBold">
				Already have an account? Go to{" "}
				<Link
					color={BaseColor.BLUE}
					label="Sign In"
					to={`/${RootScreenName.SIGN_IN}`}
					weight="semiBold"
				/>
			</Text>
			<Input
				control={control}
				errors={errors}
				isAutoFocused
				label="Name"
				name="name"
				placeholder="Name"
			/>
			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="name@example.com"
			/>
			<Input
				accessoryRight={
					<IconButton
						iconColor={BaseColor.LIGHT_GRAY}
						iconSize={INPUT_ICON_SIZE}
						name={getSecurityInputIconName(isPasswordHidden)}
						onPress={handlePasswordIconPress}
					/>
				}
				control={control}
				errors={errors}
				isSecureTextEntry={isPasswordHidden}
				label="Password"
				name="password"
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
			<Button label="Create an account" onPress={handleFormSubmit} />
		</>
	);
};

export { SignUpForm };
