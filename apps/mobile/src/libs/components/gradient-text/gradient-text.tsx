import React from "react";

import { Text, View } from "~/libs/components/components";
import { LinearGradient } from "~/libs/components/linear-gradient";
import { MaskedView } from "~/libs/components/masked-view";
import { globalStyles } from "~/libs/styles/styles";
import {
	type LinearGradientProps,
	type StyleProp,
	type TextStyle,
} from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	children: string;
	gradientProps: LinearGradientProps;
	textStyle: StyleProp<TextStyle>;
};

const GradientText: React.FC<Properties> = ({
	children,
	gradientProps,
	textStyle,
}) => {
	const { alignItemsCenter, flex1, flexDirectionRow, justifyContentCenter } =
		globalStyles;
	const { bgTransparent } = styles;

	return (
		<MaskedView
			maskElement={
				<View
					style={[alignItemsCenter, justifyContentCenter, bgTransparent, flex1]}
				>
					<Text style={textStyle}>{children}</Text>
				</View>
			}
			style={[flexDirectionRow, flex1]}
		>
			<LinearGradient {...gradientProps} style={flex1} />
		</MaskedView>
	);
};

export { GradientText };
