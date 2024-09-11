import React from "react";

import { GradientSlider, Text, View } from "~/libs/components/components";
import { categoryToColors, type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";

type Properties = {
	id: number;
	label: string;
	onValueChange: (categoryId: number, value: number) => void;
	value: number;
};

const MAX_SLIDER_VALUE = 10;
const MIN_SLIDER_VALUE = 0;

const getGradientColorsForCategory = (
	categoryName: string,
): keyof typeof colorToGradientColors => {
	return categoryToColors[categoryName.replaceAll(/\s+/g, "")] ?? "blue";
};

const SliderContent: React.FC<Properties> = ({
	id,
	label,
	onValueChange,
	value,
}) => {
	const color = getGradientColorsForCategory(label);

	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.mt32,
				globalStyles.mh32,
				globalStyles.pt8,
			]}
		>
			<Text preset="tag" style={globalStyles.mb4}>
				{label}
			</Text>
			<GradientSlider
				gradientColors={color}
				id={id}
				max={MAX_SLIDER_VALUE}
				min={MIN_SLIDER_VALUE}
				onValueChange={onValueChange}
				value={value}
			/>
		</View>
	);
};

export { SliderContent };
