import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";
import LinearGradient, {
	type LinearGradientProps,
} from "react-native-linear-gradient";

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
	return (
		<MaskedView
			maskElement={
				<View style={styles.element}>
					<Text style={[textStyle]}>{children}</Text>
				</View>
			}
			style={styles.mask}
		>
			<LinearGradient {...gradientProps} style={{ flex: 1 }} />
		</MaskedView>
	);
};

export { GradientText };
