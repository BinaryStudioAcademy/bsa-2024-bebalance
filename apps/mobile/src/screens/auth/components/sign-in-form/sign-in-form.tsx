import React from "react";

import { Button, Input, Link, Text, View } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { userSignInValidationSchema } from "~/packages/users/libs/validation-schemas/validation-schemas";
import { type UserSignInRequestDto } from "~/packages/users/users";

import { USER_SIGN_IN_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	return (
		<>
			<Text preset="heading" size="xl">
				SIGN IN
			</Text>
			<Text style={[globalStyles.mb16]}>
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
				secureTextEntry
			/>
			<Button label="SIGN IN" onPress={handleFormSubmit} />
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.justifyContentCenter,
					globalStyles.mt16,
				]}
			>
				<Link label="Forgot password?" to="/" />
			</View>
		</>
	);
};

export { SignInForm };
