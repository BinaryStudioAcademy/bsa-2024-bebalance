import React from "react";
import { Text as RNText } from "react-native";

import { BaseColor } from "~/libs/enums/enums";
import {
	type StyleProp,
	type TextStyle,
	type ValueOf,
} from "~/libs/types/types";

import {
	fontWeightToFamilyMap,
	presetToStyleMap,
	sizeToStyleMap,
} from "./libs/maps/maps";

type Properties = {
	children: React.ReactNode;
	color?: ValueOf<typeof BaseColor>;
	preset?: keyof typeof presetToStyleMap;
	size?: keyof typeof sizeToStyleMap;
	style?: StyleProp<TextStyle>;
	weight?: keyof typeof fontWeightToFamilyMap;
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
		presetToStyleMap[preset],
		size && sizeToStyleMap[size],
		weight && fontWeightToFamilyMap[weight],
		{ color },
		styleOverride,
	];

	return <RNText style={styles}>{children}</RNText>;
};

export { Text };
