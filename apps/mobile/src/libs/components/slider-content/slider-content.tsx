import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { categoryToColors, type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";
import { type SliderData } from "~/libs/types/types";

type Properties = {
	data: SliderData;
	onValueChange: (id: number, sliderValue: number) => void;
};

const MAX_SLIDER_VALUE = 10;

const getGradientColorsForCategory = (
	categoryName: string,
): keyof typeof colorToGradientColors => {
	return categoryToColors[categoryName.replaceAll(/\s+/g, "")] ?? "blue";
};

const SliderContent: React.FC<Properties> = ({ data, onValueChange }) => {
	const color = getGradientColorsForCategory(data.label);

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
				{data.label}
			</Text>
			<GradientSlider
				gradientColors={color}
				id={data.id}
				max={MAX_SLIDER_VALUE}
				onValueChange={onValueChange}
				value={data.value}
			/>
		</View>
	);
};

export { SliderContent };
