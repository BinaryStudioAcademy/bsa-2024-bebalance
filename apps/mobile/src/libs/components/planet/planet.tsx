import React from "react";

import { LinearGradient } from "~/libs/components/components";
import {
	colorToGradientColors,
	directionToGradient,
	sizeToStyles,
} from "~/libs/maps/maps";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	absolutePosition?: StyleProp<ViewStyle>;
	color: keyof typeof colorToGradientColors;
	gradientDirection?: keyof typeof directionToGradient;
	shouldOverlapChildren?: boolean;
	size: keyof typeof sizeToStyles;
	style?: StyleProp<ViewStyle>;
};

const Planet: React.FC<Properties> = ({
	absolutePosition,
	color,
	gradientDirection = "leftToRight",
	shouldOverlapChildren = false,
	size,
	style,
}: Properties) => {
	const { end, start } = directionToGradient[gradientDirection];

	return (
		<LinearGradient
			colors={colorToGradientColors[color]}
			end={end}
			start={start}
			style={[
				styles.bubble,
				sizeToStyles[size],
				shouldOverlapChildren && styles.overlap,
				absolutePosition,
				style,
			]}
		/>
	);
};

export { Planet };
