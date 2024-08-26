import React from "react";

import {
	Button,
	IconButton,
	Input,
	Link,
	Text,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
	UserValidationMessage,
} from "~/packages/users/users";

import { USER_SIGN_UP_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] =
		useState<boolean>(true);

	const handlePasswordIconPress = (): void => {
		setIsPasswordHidden(!isPasswordHidden);
	};

	const handleConfirmPasswordIconPress = (): void => {
		setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
	};

	const { control, errors, handleSubmit, setError } =
		useAppForm<UserSignUpFormDto>({
			defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
			validationSchema: userSignUpValidationSchema,
		});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit((data: UserSignUpFormDto) => {
			const { confirmPassword, ...userData } = data;

			if (confirmPassword === userData.password) {
				onSubmit(userData);
			} else {
				setError("confirmPassword", {
					message: UserValidationMessage.CONFIRM_PASSWORD_NOT_MATCH,
					type: "manual",
				});
			}
		})();
	}, [handleSubmit, onSubmit, setError]);

	return (
		<>
			<Text preset="uppercase" size="xl" weight="bold">
				CREATE AN ACCOUNT
			</Text>
			<Text style={globalStyles.mb16}>
				Already have an account? Go to{" "}
				<Link label="Sign In" to={`/${RootScreenName.SIGN_IN}`} />
			</Text>
			<Input
				control={control}
				errors={errors}
				isAutoFocused
				label="Name"
				name="name"
				placeholder="name"
			/>
			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="name@gmail.com"
			/>
			<Input
				accessoryRight={
					<IconButton
						iconColor={BaseColor.LIGHT_GRAY}
						iconSize={20}
						name={isPasswordHidden ? "visibility-off" : "visibility"}
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
						iconSize={20}
						name={isPasswordHidden ? "visibility-off" : "visibility"}
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
