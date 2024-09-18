import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { categoryToColors, type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";
import { type SliderData } from "~/libs/types/types";

import { DEFAULT_SLIDER_COLOR, MAX_SLIDER_VALUE } from "./constants/constants";

type Properties = {
	onValueChange: (id: number, sliderValue: number) => void;
	score: SliderData;
};

const getGradientColorsForCategory = (
	categoryName: string,
): keyof typeof colorToGradientColors => {
	return (
		categoryToColors[categoryName.replaceAll(/\s+/g, "")] ??
		DEFAULT_SLIDER_COLOR
	);
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
