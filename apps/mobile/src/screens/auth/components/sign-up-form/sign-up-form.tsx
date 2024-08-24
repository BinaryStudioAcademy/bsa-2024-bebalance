import React from "react";

import { Button, Input, Link, Text, View } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { userSignUpValidationSchema } from "~/packages/users/users";
import { type UserSignUpRequestDto } from "~/packages/users/users";

import { USER_SIGN_UP_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	return (
		<>
			<Text preset="uppercase" size="xl" weight="bold">
				CREATE AN ACCOUNT
			</Text>
			<Text style={[globalStyles.mb16]}>
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
				control={control}
				errors={errors}
				isSecureTextEntry
				label="Password"
				name="password"
				placeholder="*******"
			/>
			<Button label="Create an account" onPress={handleFormSubmit} />
		</>
	);
};

export { SignUpForm };
