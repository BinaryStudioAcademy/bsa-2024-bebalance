import React from "react";
import { Dimensions } from "react-native";
import { default as RNProgressBar } from "react-native-progress-step-bar";

import { LinearGradient, View } from "~/libs/components/components";
import { GradientColor } from "~/libs/enums/enums";
import { useMemo } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { SCREEN_WIDTH_MULTIPLIER } from "./constants/constants";
import { styles } from "./styles";

type Properties = {
	currentItemIndex: number;
	totalItemsAmount: number;
};

const SCREEN_WIDTH: number = Dimensions.get("window").width;
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * SCREEN_WIDTH_MULTIPLIER;
const ZERO = 0;
const ONE = 1;
const DOT_DIAMETER = 12;
const BAR_HEIGHT = 2;
const STEP_ANIMATION_DURATION = 1000;

const gradientStartCoordinates = { x: ZERO, y: ZERO };
const gradientEndCoordinates = { x: ONE, y: ZERO };

const ProgressBar: React.FC<Properties> = ({
	currentItemIndex,
	totalItemsAmount,
}) => {
	const FilledBar = useMemo(
		() => (
			<LinearGradient
				colors={[...GradientColor.BLUE]}
				end={gradientEndCoordinates}
				start={gradientStartCoordinates}
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
					end={gradientEndCoordinates}
					start={gradientStartCoordinates}
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
