import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";

type Properties = {
	color: keyof typeof colorToGradientColors;
	label: string;
};

const MAX_SLIDER_VALUE: number = 10;
const MIN_SLIDER_VALUE: number = 0;

const SliderContent: React.FC<Properties> = ({ color, label }) => {
	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.mt48,
				globalStyles.mh32,
			]}
		>
			<Text preset="tag" style={globalStyles.mb48}>
				{label}
			</Text>
			<GradientSlider
				gradientColors={color}
				max={MAX_SLIDER_VALUE}
				min={MIN_SLIDER_VALUE}
			/>
		</View>
	);
};

export { SliderContent };
