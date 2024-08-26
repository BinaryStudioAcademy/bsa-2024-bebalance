import React from "react";

import {
	GradientText,
	LinearGradient,
	Pressable,
	Text,
	View,
} from "~/libs/components/components";
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

	return (
		<Pressable disabled={isDisabled} onPress={onPress} style={styles.wrapper}>
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
							globalStyles.alignItemsCenter,
							globalStyles.flex1,
							globalStyles.justifyContentCenter,
							styles.rounded,
							!isFilled && globalStyles.p2,
						]}
						useAngle
					>
						{isFilled ? (
							<Text color={BaseColor.BG_WHITE} preset="uppercase" size="md">
								{label}
							</Text>
						) : (
							<View
								style={[
									globalStyles.alignItemsCenter,
									styles.bgWhite,
									globalStyles.flex1,
									globalStyles.justifyContentCenter,
									styles.rounded,
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
									textProps={{
										children: label,
										color: BaseColor.BLACK,
										preset: "uppercase",
										size: "md",
										weight: "bold",
									}}
								/>
							</View>
						)}
					</LinearGradient>
				);
			}}
		</Pressable>
	);
};

export { Button };
