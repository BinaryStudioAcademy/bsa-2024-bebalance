import { LinearGradient } from "~/libs/components/components";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import {
	colorToGradientColors,
	directionToGradient,
	sizeToStyles,
} from "../background-wrapper/libs/maps/maps";
import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientColors;
	gradientDirection?: keyof typeof directionToGradient;
	size: keyof typeof sizeToStyles;
	style?: StyleProp<ViewStyle>;
};

const Planet = ({
	color,
	gradientDirection = "leftToRight",
	size,
	style,
}: Properties) => {
	const { end, start } = directionToGradient[gradientDirection];

	return (
		<LinearGradient
			colors={colorToGradientColors[color]}
			end={end}
			start={start}
			style={[styles.bubble, sizeToStyles[size], style]}
		/>
	);
};

export { Planet };
