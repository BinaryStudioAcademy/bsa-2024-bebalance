import React, { ReactNode } from "react";
import { Text as RNText, type StyleProp, type TextStyle } from "react-native";

import { BaseColor, FontSize, LineHeight, WeightMap } from "~/libs/enums/enums";

import { styles as presetStyles } from "./styles";

const fontWeightToFamilyMap = {
	BOLD: "Nunito-Bold",
	EXTRA_BOLD: "Nunito-ExtraBold",
	MEDIUM: "Nunito-Medium",
	REGULAR: "Nunito-Regular",
	SEMI_BOLD: "Nunito-SemiBold",
};

type Properties = {
	children: ReactNode;
	color?: (typeof BaseColor)[keyof typeof BaseColor];
	preset?: "default" | "heading" | "subheading";
	size?: keyof typeof FontSize;
	style?: StyleProp<TextStyle>;
	weight?: keyof typeof WeightMap;
};

const Text = ({
	children,
	color = BaseColor.BLACK,
	preset = "default",
	size = "MD",
	style: styleOverride,
	weight = "REGULAR",
}: Properties) => {
	const baseStyle = presetStyles[preset];

	const sizeToStyleMap = {
		fontFamily: fontWeightToFamilyMap[weight],
		fontSize: FontSize[size],
		lineHeight: LineHeight[size],
	} satisfies TextStyle;

	const colorStyle: TextStyle = {
		color: color,
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
