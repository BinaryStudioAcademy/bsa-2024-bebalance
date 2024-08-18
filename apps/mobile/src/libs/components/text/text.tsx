import React, { ReactNode } from "react";
import { TextStyle } from "react-native";

import { RNText } from "~/libs/components/components";
import { fontSize, lineHeight } from "~/libs/enums/fonts/font-size.enum";
import { getFontFamily } from "~/libs/helpers/get-fonts-family/get-fonts-family";

import { styles as presetStyles } from "./styles";

type TextProperties = {
	children: ReactNode;
	color?: string;
	fontFamily?: "INTER" | "LATO" | "NUNITO";
	presetProps?: "default" | "heading" | "subheading";
	size?: keyof typeof fontSize;
	style?: TextStyle | TextStyle[];
	weight?: "bold" | "extraBold" | "medium" | "regular" | "semiBold";
};

const Text = ({
	children,
	color = "#000000",
	fontFamily = "NUNITO",
	presetProps: presetProperties = "default",
	size,
	style,
	weight = "regular",
}: TextProperties) => {
	const baseStyle = presetStyles[presetProperties];

	const dynamicStyle = size
		? {
				fontFamily: getFontFamily(fontFamily, weight),
				fontSize: fontSize[size],
				lineHeight: lineHeight[size],
			}
		: {};
	return (
		<RNText style={[baseStyle, dynamicStyle, { color }, style]}>
			{children}
		</RNText>
	);
};

export { Text };
