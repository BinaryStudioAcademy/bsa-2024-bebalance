import React from "react";

import { Button, Link, Text, View } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";

type Properties = {
	onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => {
	return (
		<View>
			<Text>Sign In</Text>
			<Button
				label="Sign in"
				onPress={(): void => {
					// TODO: handle Sign in
				}}
			/>
			<Link label="Go to Sign Up" to={`/${RootScreenName.SIGN_UP}`} />
		</View>
	);
};

export { SignInForm };
