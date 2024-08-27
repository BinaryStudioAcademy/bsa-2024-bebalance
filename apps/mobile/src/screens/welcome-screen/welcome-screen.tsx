import React from "react";

import { Link, Text, View } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/navigation/root-screen-name.enum";

const WelcomeScreen: React.FC = () => {
	return (
		<View>
			<Text>Welcome to the App!</Text>
			<Link
				label="To bottom tabs nav"
				to={`/${RootScreenName.BOTTOM_TABS_NAVIGATOR}`}
			/>
		</View>
	);
};

export { WelcomeScreen };
