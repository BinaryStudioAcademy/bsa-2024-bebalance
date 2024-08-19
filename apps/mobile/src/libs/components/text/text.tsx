import React, { ReactNode } from "react";
import { Text as RNText, StyleProp, TextStyle } from "react-native";

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
	color?: keyof typeof BaseColor;
	fontFamily?: keyof typeof FontFamilies;
	preset?: "default" | "heading" | "subheading";
	size?: keyof typeof FontSize;
	style?: StyleProp<TextStyle>;
	weight?: "bold" | "extraBold" | "medium" | "regular" | "semiBold";
};

const Text = ({
	children,
	color = "BLACK",
	preset: presetProperties = "default",
	size,
	style: styleOverride,
	weight = "regular",
}: Properties) => {
	const baseStyle = presetStyles[presetProperties];

	const sizeToStyleMap = {
		fontFamily: "NUNITO",
		fontSize: size ? FontSize[size] : undefined,
		fontWeight: WeightMap[weight] as TextStyle["fontWeight"],
		lineHeight: size ? LineHeight[size] : undefined,
	} satisfies TextStyle;

	const colorStyle: TextStyle = {
		color: BaseColor[color],
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
