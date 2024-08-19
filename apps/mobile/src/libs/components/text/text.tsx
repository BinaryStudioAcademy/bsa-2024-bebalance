import React, { ReactNode } from "react";
import { Text as RNText, type StyleProp, type TextStyle } from "react-native";

import {
	BaseColor,
	FontFamilies,
	FontSize,
	LineHeight,
	WeightMap,
} from "~/libs/enums/enums";

import { styles as presetStyles } from "./styles";

type Properties = {
	children: ReactNode;
	color?: (typeof BaseColor)[keyof typeof BaseColor];
	fontFamily?: keyof typeof FontFamilies;
	preset?: "default" | "heading" | "subheading";
	size?: keyof typeof FontSize;
	style?: StyleProp<TextStyle>;
	weight?: keyof typeof WeightMap;
};

const Text = ({
	children,
	color = BaseColor.BLACK,
	preset: presetProperties = "default",
	size = "md",
	style: styleOverride,
	weight = "regular",
}: Properties) => {
	const baseStyle = presetStyles[presetProperties];

	const sizeToStyleMap = {
		fontFamily: "NUNITO",
		fontSize: FontSize[size],
		fontWeight: WeightMap[weight] as TextStyle["fontWeight"],
		lineHeight: LineHeight[size],
	} satisfies TextStyle;

	const colorStyle: TextStyle = {
		color,
	};

	const styles: StyleProp<TextStyle> = [
		baseStyle,
		sizeToStyleMap,
		colorStyle,
		styleOverride,
	];

	return <RNText style={styles}>{children}</RNText>;
};

export { Text };
