import React from "react";

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
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/packages/users/users";

import { USER_SIGN_IN_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const INPUT_ICON_SIZE = 20;

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

	const handlePasswordIconPress = useCallback((): void => {
		setIsPasswordHidden(!isPasswordHidden);
	}, [isPasswordHidden]);

	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	return (
		<>
			<Text preset="uppercase" size="xl" weight="bold">
				SIGN IN
			</Text>
			<Text style={globalStyles.mb16} weight="semiBold">
				No account? Go to{" "}
				<Link
					color={BaseColor.BLUE}
					label="Create an account"
					to={`/${RootScreenName.SIGN_UP}`}
					weight="semiBold"
				/>
			</Text>
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
				placeholder="********"
			/>
			<Button label="SIGN IN" onPress={handleFormSubmit} />
			<View style={globalStyles.alignItemsCenter}>
				<Link
					color={BaseColor.BLUE}
					label="Forgot password?"
					to={`/${RootScreenName.FORGOT_PASSWORD}`}
					weight="semiBold"
				/>
			</View>
		</>
	);
};

export { SignInForm };
