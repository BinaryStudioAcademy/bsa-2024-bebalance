import React from "react";

import {
	ScreenWrapper,
	Text,
	View,
	Wheel as WheelChart,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

const WHEEL_SIZE = 250;

const Wheel: React.FC = () => {
	return (
		<ScreenWrapper>
			<Text>My wheel results</Text>
			<View style={globalStyles.alignItemsCenter}>
				<WheelChart size={WHEEL_SIZE} />
			</View>
		</ScreenWrapper>
	);
};

export { Wheel };
