import React from "react";

import {
	Button,
	IconButton,
	Input,
	Link,
	Tag,
	Text,
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

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
	const INPUT_ICON_SIZE = 20;

	const handlePasswordIconPress = (): void => {
		setIsPasswordHidden(!isPasswordHidden);
	};

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
			<Text style={[globalStyles.mb16]}>
				No account? Go to{" "}
				<Link label="Create an account" to={`/${RootScreenName.SIGN_UP}`} />
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
			<Tag color="green" label="Love" />
		</>
	);
};

export { SignInForm };
