import React from "react";

import {
	BackgroundWrapper,
	ScreenWrapper,
	SliderContent,
	View,
} from "~/libs/components/components";
import { type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

const sliderData: {
	color: keyof typeof colorToGradientColors;
	label: string;
}[] = [
	{ color: "red", label: "Love" },
	{ color: "lime", label: "Work" },
	{ color: "green", label: "Money" },
	{ color: "violet", label: "Friends" },
	{ color: "yellow", label: "Physical" },
	{ color: "pink", label: "Free time" },
	{ color: "orange", label: "Spiritual" },
	{ color: "blue", label: "Mental" },
];

const Settings: React.FC = () => {
	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.ph12,
						globalStyles.pt48,
						styles.container,
					]}
				>
					{sliderData.map((item, index) => (
						<SliderContent color={item.color} key={index} label={item.label} />
					))}
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Settings };
