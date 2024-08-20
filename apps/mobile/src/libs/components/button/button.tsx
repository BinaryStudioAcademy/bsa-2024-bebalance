import React from "react";

import { Pressable, Text, View } from "~/libs/components/components";
import { GradientText } from "~/libs/components/gradient-text";
import { LinearGradient } from "~/libs/components/linear-gradient";
import { BaseColor, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	appearance?: "filled" | "outlined";
	isDisabled?: boolean;
	label: string;
	onPress: () => void;
};

const Button: React.FC<Properties> = ({
	appearance = "filled",
	isDisabled = false,
	label,
	onPress,
}) => {
	const FIRST_COLOR_STOP = -0.4;
	const SECOND_COLOR_STOP = 0.9;
	const isFilled = appearance === "filled";
	const { alignItemsCenter, flex1, justifyContentCenter } = globalStyles;
	const { bgWhite, colorBlack, colorWhite, p1, rounded, text, wrapper } =
		styles;

	return (
		<Pressable disabled={isDisabled} onPress={onPress} style={wrapper}>
			{({ pressed }) => {
				const activeButtonColors = pressed
					? [...GradientColor.BLUE]
					: [BaseColor.BLACK, BaseColor.BLACK];
				const conditionalColors = isDisabled
					? [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY]
					: activeButtonColors;
				return (
					<LinearGradient
						angle={305}
						angleCenter={{ x: 0.5, y: 0.5 }}
						colors={conditionalColors}
						locations={[FIRST_COLOR_STOP, SECOND_COLOR_STOP]}
						style={[
							alignItemsCenter,
							flex1,
							justifyContentCenter,
							rounded,
							!isFilled && p1,
						]}
						useAngle
					>
						{isFilled ? (
							<Text style={[colorWhite, text]}>{label}</Text>
						) : (
							<View
								style={[
									alignItemsCenter,
									bgWhite,
									flex1,
									justifyContentCenter,
									rounded,
								]}
							>
								<GradientText
									gradientProps={{
										angle: 305,
										angleCenter: { x: 0.5, y: 0.5 },
										colors: conditionalColors,
										locations: [FIRST_COLOR_STOP, SECOND_COLOR_STOP],
										useAngle: true,
									}}
									textStyle={[colorBlack, text]}
								>
									{label}
								</GradientText>
							</View>
						)}
					</LinearGradient>
				);
			}}
		</Pressable>
	);
};

export { Button };
