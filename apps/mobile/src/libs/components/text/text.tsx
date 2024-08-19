import React, { ReactNode } from "react";
import { Text as RNText, type StyleProp, type TextStyle } from "react-native";
import { ValueOf } from "shared";

import { BaseColor } from "~/libs/enums/enums";

type Preset = "default" | "heading" | "subheading";

type Properties = {
	children: ReactNode;
	color?: ValueOf<typeof BaseColor>;
	preset?: Preset;
	size?: keyof typeof sizeToStyleMap;
	style?: StyleProp<TextStyle>;
	weight?: keyof typeof fontWeightToFamilyMap;
};

const Text = ({
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

const fontWeightToFamilyMap = {
	bold: { fontFamily: "Nunito-Bold" },
	extraBold: { fontFamily: "Nunito-ExtraBold" },
	medium: { fontFamily: "Nunito-Medium" },
	regular: { fontFamily: "Nunito-Regular" },
	semiBold: { fontFamily: "Nunito-SemiBold" },
};

const sizeToStyleMap = {
	lg: { fontSize: 20, lineHeight: 25 } satisfies TextStyle,
	md: { fontSize: 16, lineHeight: 22 } satisfies TextStyle,
	sm: { fontSize: 14, lineHeight: 19 } satisfies TextStyle,
	xl: { fontSize: 24, lineHeight: 26 } satisfies TextStyle,
	xs: { fontSize: 12, lineHeight: 16 } satisfies TextStyle,
	xxl: { fontSize: 32, lineHeight: 40 } satisfies TextStyle,
};

const presetToStyleMap: Record<Preset, StyleProp<TextStyle>> = {
	default: [sizeToStyleMap.md, fontWeightToFamilyMap.regular],
	heading: [sizeToStyleMap.xxl, fontWeightToFamilyMap.bold],
	subheading: [sizeToStyleMap.lg, fontWeightToFamilyMap.semiBold],
};

export { Text };
