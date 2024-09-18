import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { getGradientColorsForCategory } from "~/libs/helpers/helpers";
import { globalStyles } from "~/libs/styles/styles";
import { type SliderData } from "~/libs/types/types";

import { MAX_SLIDER_VALUE } from "./constants/constants";

type Properties = {
	onValueChange: (id: number, sliderValue: number) => void;
	score: SliderData;
};

const SliderContent: React.FC<Properties> = ({ onValueChange, score }) => {
	const color = getGradientColorsForCategory(score.label);

	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.mt32,
				globalStyles.mh24,
			]}
		>
			<Text preset="tag" style={globalStyles.mb4}>
				{score.label}
			</Text>
			<GradientSlider
				gradientColors={color}
				id={score.id}
				max={MAX_SLIDER_VALUE}
				onValueChange={onValueChange}
				value={score.value}
			/>
		</View>
	);
};

export { SliderContent };
