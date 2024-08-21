import React, { ComponentProps } from "react";

import { Text, View } from "~/libs/components/components";
import { LinearGradient } from "~/libs/components/linear-gradient";
import { MaskedView } from "~/libs/components/masked-view";
import { globalStyles } from "~/libs/styles/styles";
import { type LinearGradientProps } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	gradientProps: LinearGradientProps;
	textProps: ComponentProps<typeof Text>;
};

const GradientText: React.FC<Properties> = ({ gradientProps, textProps }) => {
	return (
		<MaskedView
			maskElement={
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.justifyContentCenter,
						styles.bgTransparent,
						globalStyles.flex1,
					]}
				>
					<Text {...textProps} />
				</View>
			}
			style={[globalStyles.flexDirectionRow, globalStyles.flex1]}
		>
			<LinearGradient {...gradientProps} style={globalStyles.flex1} />
		</MaskedView>
	);
};

export { GradientText };
