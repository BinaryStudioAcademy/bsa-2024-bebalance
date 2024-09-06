import React from "react";
import { Dimensions } from "react-native";
import { default as RNProgressBar } from "react-native-progress-step-bar";

import { LinearGradient, View } from "~/libs/components/components";
import { GradientColor } from "~/libs/enums/enums";
import { useMemo } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import {
	BAR_HEIGHT,
	DOT_DIAMETER,
	SCREEN_WIDTH_MULTIPLIER,
	STEP_ANIMATION_DURATION,
} from "./constants/constants";
import { GradientCoordinates } from "./enums/enums";
import { styles } from "./styles";

type Properties = {
	currentItemIndex: number;
	totalItemsAmount: number;
};

const SCREEN_WIDTH: number = Dimensions.get("window").width;
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * SCREEN_WIDTH_MULTIPLIER;

const ProgressBar: React.FC<Properties> = ({
	currentItemIndex,
	totalItemsAmount,
}) => {
	const FilledBar = useMemo(
		() => (
			<LinearGradient
				colors={[...GradientColor.BLUE]}
				end={GradientCoordinates.END}
				start={GradientCoordinates.START}
				style={styles.bar}
			/>
		),
		[],
	);

	const Dot = useMemo(
		() => (
			<View style={styles.dotContainer}>
				<LinearGradient
					colors={[...GradientColor.BLUE]}
					end={GradientCoordinates.END}
					start={GradientCoordinates.START}
					style={[
						styles.dotBorder,
						globalStyles.alignItemsCenter,
						globalStyles.justifyContentCenter,
					]}
				>
					<View style={styles.dotCenter} />
				</LinearGradient>
			</View>
		),
		[],
	);

	return (
		<View style={[globalStyles.mt12, globalStyles.alignItemsCenter]}>
			<RNProgressBar
				backgroundBarStyle={styles.backgroundBarStyle}
				backgroundDotStyle={styles.backgroundDotStyle}
				currentStep={currentItemIndex}
				CustomizableDot={Dot}
				CustomizedFilledBar={FilledBar}
				dotDiameter={DOT_DIAMETER}
				filledBarStyle={styles.filledBarStyle}
				filledDotStyle={styles.filledDotStyle}
				height={BAR_HEIGHT}
				steps={totalItemsAmount}
				stepToStepAnimationDuration={STEP_ANIMATION_DURATION}
				width={PROGRESS_BAR_WIDTH}
				withDots
			/>
		</View>
	);
};

export { ProgressBar };
