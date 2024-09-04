import React from "react";

import {
	ScreenWrapper,
	Text,
	View,
	Wheel as WheelChart,
} from "~/libs/components/components";
import { AnimationName, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

const mockData = [
	{ colors: GradientColor.YELLOW, label: "Physical", score: 9 },
	{ colors: GradientColor.LIME, label: "Work", score: 8 },
	{ colors: GradientColor.VIOLET, label: "Friends", score: 7 },
	{ colors: GradientColor.RED, label: "Love", score: 6 },
	{ colors: GradientColor.GREEN, label: "Money", score: 5 },
	{ colors: GradientColor.ROSE, label: "Free time", score: 8 },
	{ colors: GradientColor.ORANGE, label: "Spiritual", score: 5 },
	{ colors: GradientColor.BLUE, label: "Mental", score: 7 },
];

const WHEEL_SIZE = 250;

const Wheel: React.FC = () => {
	return (
		<ScreenWrapper>
			<Text>My wheel results</Text>
			<View style={globalStyles.alignItemsCenter}>
				<WheelChart categoriesData={mockData} size={WHEEL_SIZE} />
				<WheelChart
					animation={AnimationName.PULSE}
					categoriesData={mockData}
					isLabelShown={false}
					size={WHEEL_SIZE}
				/>
			</View>
		</ScreenWrapper>
	);
};

export { Wheel };
