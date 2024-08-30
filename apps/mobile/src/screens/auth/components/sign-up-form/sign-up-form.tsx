import {
	Button,
	IconButton,
	Input,
	Link,
	Text,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { getSecurityInputIconName } from "~/libs/helpers/helpers";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
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

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
	const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] =
		useState<boolean>(true);
	const INPUT_ICON_SIZE = 20;

	const handlePasswordIconPress = (): void => {
		setIsPasswordHidden(!isPasswordHidden);
	};

	const handleConfirmPasswordIconPress = (): void => {
		setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
	};

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
