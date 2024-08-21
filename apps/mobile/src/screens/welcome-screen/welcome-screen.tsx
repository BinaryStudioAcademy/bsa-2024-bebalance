import React from "react";
import { View } from "react-native";

import { Text } from "~/libs/components/components";

const WelcomeScreen: React.FC = () => {
	return (
		<View>
			<Text>Welcome to the App!</Text>
		</View>
	);
};

export { WelcomeScreen };
