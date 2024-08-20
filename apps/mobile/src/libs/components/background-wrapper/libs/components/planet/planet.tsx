import { type StyleProp, type ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
	colorToGradientMap,
	gradientDirectionMap,
	sizeToWidthHeightMap,
} from "./../../maps/maps";
import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientMap;
	gradientDirection?: keyof typeof gradientDirectionMap;
	size: keyof typeof sizeToWidthHeightMap;
	style?: StyleProp<ViewStyle>;
};

const Planet = ({
	color,
	gradientDirection = "leftToRight",
	size,
	style,
}: Properties) => {
	const { end, start } = gradientDirectionMap[gradientDirection];

	return (
		<LinearGradient
			colors={colorToGradientMap[color]}
			end={end}
			start={start}
			style={[styles.bubble, sizeToWidthHeightMap[size], style]}
		/>
	);
};

export { Planet };
