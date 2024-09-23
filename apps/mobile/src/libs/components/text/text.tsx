import React from "react";
import { Text as RNText, type TextProps } from "react-native";

import { BaseColor } from "~/libs/enums/enums";
import {
	fontWeightToFamily,
	presetToTextStyle,
	sizeToTextStyle,
} from "~/libs/maps/maps";
import {
	type StyleProp,
	type TextStyle,
	type ValueOf,
} from "~/libs/types/types";

type Properties = {
	color?: ValueOf<typeof BaseColor>;
	preset?: keyof typeof presetToTextStyle;
	size?: keyof typeof sizeToTextStyle;
	weight?: keyof typeof fontWeightToFamily;
} & TextProps;

const Text: React.FC<Properties> = ({
	children,
	color = BaseColor.BLACK,
	preset = "default",
	size,
	style: styleOverride,
	weight,
	...textProperties
}: Properties) => {
	const styles: StyleProp<TextStyle> = [
		presetToTextStyle[preset],
		size && sizeToTextStyle[size],
		weight && fontWeightToFamily[weight],
		{ color },
		styleOverride,
	];

	return (
		<RNText style={styles} {...textProperties}>
			{children}
		</RNText>
	);
};

export { Text };
