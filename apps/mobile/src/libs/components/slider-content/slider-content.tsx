import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";

type Properties = {
	color: keyof typeof colorToGradientColors;
	initValue: number;
	label: string;
};

const MAX_SLIDER_VALUE = 10;
const MIN_SLIDER_VALUE = 0;

const SliderContent: React.FC<Properties> = ({ color, initValue, label }) => {
	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.mt32,
				globalStyles.mh32,
				globalStyles.pt8,
			]}
		>
			<Text preset="tag" style={globalStyles.mb4}>
				{label}
			</Text>
			<GradientSlider
				gradientColors={color}
				initValue={initValue}
				max={MAX_SLIDER_VALUE}
				min={MIN_SLIDER_VALUE}
			/>
		</View>
	);
};

export { SliderContent };
