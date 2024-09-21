import React from "react";

import {
	GradientText,
	Icon,
	LinearGradient,
	Pressable,
	Text,
	View,
} from "~/libs/components/components";
import { AngleGradient, BaseColor, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type IconName } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	appearance?: "filled" | "outlined";
	iconLeftName?: IconName;
	isDisabled?: boolean;
	label: string;
	onPress: () => void;
};

const ICON_SIZE = 24;

const Button: React.FC<Properties> = ({
	appearance = "filled",
	iconLeftName,
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
						angle={AngleGradient.ANGLE}
						angleCenter={{ x: AngleGradient.X_POINT, y: AngleGradient.Y_POINT }}
						colors={conditionalColors}
						locations={[AngleGradient.FIRST_STOP, AngleGradient.SECOND_STOP]}
						style={[
							globalStyles.alignItemsCenter,
							globalStyles.flex1,
							globalStyles.flexDirectionRow,
							globalStyles.gap8,
							globalStyles.justifyContentCenter,
							styles.rounded,
							!isFilled && globalStyles.p2,
						]}
						useAngle
					>
						{isFilled ? (
							<>
								{iconLeftName && (
									<Icon
										color={BaseColor.BG_WHITE}
										name={iconLeftName}
										size={ICON_SIZE}
									/>
								)}
								<Text
									color={BaseColor.BG_WHITE}
									preset="uppercase"
									size="md"
									weight="bold"
								>
									{label}
								</Text>
							</>
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
										angle: AngleGradient.ANGLE,
										angleCenter: {
											x: AngleGradient.X_POINT,
											y: AngleGradient.Y_POINT,
										},
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
