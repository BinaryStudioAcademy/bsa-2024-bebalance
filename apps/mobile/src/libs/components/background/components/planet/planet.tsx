import { type StyleProp, type TextStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { GradientColor } from "~/libs/enums/app/gradient-color.enum";

import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientMap;
	direction?: keyof typeof gradientDirectionMap;
	size: keyof typeof sizeToWidthHeightMap;
	style?: StyleProp<TextStyle>;
};

const Planet = ({
	color,
	direction = "leftToRight",
	size,
	style,
}: Properties) => {
	const { end, start } = gradientDirectionMap[direction];

	return (
		<LinearGradient
			colors={colorToGradientMap[color]}
			end={end}
			start={start}
			style={[styles.bubble, sizeToWidthHeightMap[size], style]}
		/>
	);
};

const sizeToWidthHeightMap = {
	lg: { height: 160, width: 160 },
	md: { height: 100, width: 100 },
	sm: { height: 86, width: 86 },
};

const colorToGradientMap = {
	blue: [...GradientColor.BLUE],
	green: [...GradientColor.LIME],
	pink: [...GradientColor.ROSE],
};

const gradientDirectionMap = {
	leftToRight: { end: { x: 1, y: 0 }, start: { x: 0, y: 0 } },
	rightToLeft: { end: { x: 0, y: 0 }, start: { x: 1, y: 0 } },
	topToBottom: { end: { x: 0, y: 0 }, start: { x: 0, y: 1 } },
};

export { Planet };
