import React from "react";
import { Text as RNText } from "react-native";

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
	children: React.ReactNode;
	color?: ValueOf<typeof BaseColor>;
	preset?: keyof typeof presetToTextStyle;
	size?: keyof typeof sizeToTextStyle;
	style?: StyleProp<TextStyle>;
	weight?: keyof typeof fontWeightToFamily;
};

const Text: React.FC<Properties> = ({
	children,
	color = BaseColor.BLACK,
	preset = "default",
	size,
	style: styleOverride,
	weight,
}: Properties) => {
	const styles: StyleProp<TextStyle> = [
		presetToTextStyle[preset],
		size && sizeToTextStyle[size],
		weight && fontWeightToFamily[weight],
		{ color },
		styleOverride,
	];

	return <RNText style={styles}>{children}</RNText>;
};

export { Text };
