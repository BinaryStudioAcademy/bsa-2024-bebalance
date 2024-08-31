import React from "react";

import {
	LinearGradient,
	Planet,
	Text,
	View,
} from "~/libs/components/components";
import { type colorToGradientColors } from "~/libs/components/planet/libs/maps/maps";
import { AngleGradient, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	color: keyof typeof colorToGradientColors;
	label: string;
};

const Tag: React.FC<Properties> = ({ color, label }) => {
	const borderColor = [...GradientColor.BLUE];

	return (
		<LinearGradient
			angle={AngleGradient.ANGLE}
			angleCenter={{
				x: AngleGradient.X_POINT,
				y: AngleGradient.Y_POINT,
			}}
			colors={borderColor}
			locations={[AngleGradient.FIRST_STOP, AngleGradient.SECOND_STOP]}
			style={styles.gradientContainer}
			useAngle
		>
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.justifyContentStart,
					globalStyles.pv4,
					globalStyles.ph8,
					styles.innerContainer,
				]}
			>
				<Planet color={color} size="xxs" style={styles.tagPlanet} />
				<Text preset="tag" style={globalStyles.pl8}>
					{label}
				</Text>
			</View>
		</LinearGradient>
	);
};

export { Tag };
