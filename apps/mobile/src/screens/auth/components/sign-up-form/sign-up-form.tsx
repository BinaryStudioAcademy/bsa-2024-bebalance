import React from "react";

import { Button, Input, Link, Text, View } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback } from "~/libs/hooks/hooks";
import { userSignUpValidationSchema } from "~/packages/users/libs/validation-schemas/validation-schemas";
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
		<View>
			<Text>Sign Up</Text>
			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="Enter your email"
			/>
			<Input
				control={control}
				errors={errors}
				label="Name"
				name="name"
				placeholder="Enter your name"
			/>
			<Input
				control={control}
				errors={errors}
				label="Password"
				name="password"
				placeholder="Enter your password"
			/>
			<Button label="Sign up" onPress={handleFormSubmit} />
			<Link label="Go to Sign In" to={`/${RootScreenName.SIGN_IN}`} />
		</View>
	);
};

export { SignUpForm };
