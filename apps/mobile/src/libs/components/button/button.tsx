import React from "react";
import { Pressable, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Text } from "~/libs/components/components";
import { BaseColor, GradientColor } from "~/libs/enums/enums";

import { GradientText } from "../gradient-text/gradient-text";
import { styles } from "./styles";

type Properties = {
	appearance?: "filled" | "outlined";
	borderRadius: number;
	disabled?: boolean | null;
	label: string;
	onPress: () => void;
};

const Button: React.FC<Properties> = ({
	appearance = "filled",
	borderRadius,
	disabled,
	label,
	onPress,
}) => {
	const FIRST_COLOR_STOP = -0.4;
	const SECOND_COLOR_STOP = 0.9;
	const IS_FILLED = appearance === "filled";

	return (
		<Pressable disabled={disabled} onPress={onPress} style={[styles.wrapper]}>
			{({ pressed }) =>
				pressed ? (
					<LinearGradient
						angle={305}
						angleCenter={{ x: 0.5, y: 0.5 }}
						colors={[...GradientColor.BLUE]}
						locations={[FIRST_COLOR_STOP, SECOND_COLOR_STOP]}
						style={[styles.btn, !IS_FILLED && { padding: 1 }, { borderRadius }]}
						useAngle
					>
						{IS_FILLED ? (
							<Text style={[styles.label, styles.filledBtnLabel]}>{label}</Text>
						) : (
							<View
								style={[styles.btn, styles.outlinedInner, { borderRadius }]}
							>
								<GradientText
									gradientProps={{
										angle: 305,
										angleCenter: { x: 0.5, y: 0.5 },
										colors: [...GradientColor.BLUE],
										locations: [FIRST_COLOR_STOP, SECOND_COLOR_STOP],
										useAngle: true,
									}}
									textStyle={styles.label}
								>
									{label}
								</GradientText>
							</View>
						)}
					</LinearGradient>
				) : (
					<View
						style={[
							styles.btn,
							{ borderRadius },
							IS_FILLED
								? {
										backgroundColor: disabled
											? BaseColor.LIGHT_GRAY
											: BaseColor.BLACK,
									}
								: [
										styles.outlined,
										styles.outlinedInner,
										{
											borderColor: disabled
												? BaseColor.LIGHT_GRAY
												: BaseColor.BLACK,
										},
									],
						]}
					>
						<Text
							style={[
								styles.label,
								IS_FILLED
									? styles.filledBtnLabel
									: {
											color: disabled ? BaseColor.LIGHT_GRAY : BaseColor.BLACK,
										},
							]}
						>
							{label}
						</Text>
					</View>
				)
			}
		</Pressable>
	);
};

export { Button };
