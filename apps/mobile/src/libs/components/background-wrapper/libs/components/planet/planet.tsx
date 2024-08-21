import { LinearGradient } from "~/libs/components/components";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import {
	colorToGradientColorsMap,
	directionToGradientMap,
	sizeToStylesMap,
} from "../../maps/maps";
import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientColorsMap;
	gradientDirection?: keyof typeof directionToGradientMap;
	size: keyof typeof sizeToStylesMap;
	style?: StyleProp<ViewStyle>;
};

const Planet = ({
	color,
	gradientDirection = "leftToRight",
	size,
	style,
}: Properties) => {
	const { end, start } = directionToGradientMap[gradientDirection];

	return (
		<LinearGradient
			colors={colorToGradientColorsMap[color]}
			end={end}
			start={start}
			style={[styles.bubble, sizeToStylesMap[size], style]}
		/>
	);
};

export { Planet };
