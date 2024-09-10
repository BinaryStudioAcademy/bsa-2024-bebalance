import React from "react";

import { LinearGradient } from "~/libs/components/components";
import { colorToGradientColors } from "~/libs/maps/maps";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientColors;
	style: StyleProp<ViewStyle>;
};

const SliderSection: React.FC<Properties> = ({ color, style }) => {
	return (
		<LinearGradient
			colors={colorToGradientColors[color]}
			style={[styles.slider, style]}
		/>
	);
};

export { SliderSection };
