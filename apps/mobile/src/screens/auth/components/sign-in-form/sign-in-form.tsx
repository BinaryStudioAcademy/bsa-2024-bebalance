import React from "react";
import { StyleSheet } from "react-native";
//temp

import {
	BackgroundWrapper,
	Button,
	Input,
	Link,
	Text,
	View,
} from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback } from "~/libs/hooks/hooks";
import { userSignInValidationSchema } from "~/packages/users/libs/validation-schemas/validation-schemas";
import { type UserSignInRequestDto } from "~/packages/users/users";
import { USER_SIGN_UP_DEFAULT_VALUES } from "~/screens/auth/components/sign-up-form/libs/constants";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	return (
		<BackgroundWrapper>
			<Text preset="heading" size="xl">
				SIGN IN
			</Text>
			<Text style={styles.noAccountText}>
				No account? Go to{" "}
				<Link label="Create an account" to={`/${RootScreenName.SIGN_UP}`} />
			</Text>
			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="name@gmail.com"
			/>
			<Input
				control={control}
				errors={errors}
				label="Password"
				name="password"
				placeholder="********"
			/>
			<Button label="SIGN IN" onPress={handleFormSubmit} />
			<View style={styles.forgotPasswordContainer}>
				<Link label="Forgot password?" to="/" />
			</View>
		</BackgroundWrapper>
	);
};

const styles = StyleSheet.create({
	forgotPasswordContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	noAccountText: {
		marginBottom: 20,
	},
});

export { SignInForm };
