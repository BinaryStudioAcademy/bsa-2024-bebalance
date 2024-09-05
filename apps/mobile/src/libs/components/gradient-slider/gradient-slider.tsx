import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { type LayoutChangeEvent } from "react-native";

import {
	Icon,
	LinearGradient,
	Planet,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import {
	generateGradientColors,
	generateGradientLocations,
} from "~/libs/helpers/helpers";
import { type colorToGradientColors } from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	gradientColors: keyof typeof colorToGradientColors;
	max: number;
	min: number;
};

const INITIAL_SLIDER_WIDTH = 0;
const MAX_PERCENT = 100;
const PLANET_TRANSLATE_OFFSET = 3;
const ICON_TRANSLATE_OFFSET = 20;

const GradientSlider: React.FC<Properties> = ({ gradientColors, max, min }) => {
	const [value, setValue] = useState<number>(min);
	const [sliderWidth, setSliderWidth] = useState<number>(INITIAL_SLIDER_WIDTH);
	const initialColors = generateGradientColors(min, gradientColors, max);
	const [color, setColor] = useState<string[]>(initialColors);

	const handleLayout = (event: LayoutChangeEvent): void => {
		const { width } = event.nativeEvent.layout;
		setSliderWidth(width);
	};

	const pixelsPerPercent = sliderWidth / MAX_PERCENT;
	const translateXBase = (value / max) * MAX_PERCENT * pixelsPerPercent;

	const translateXForPlanet = translateXBase - PLANET_TRANSLATE_OFFSET;
	const translateXForIcon = translateXBase - ICON_TRANSLATE_OFFSET;

	return (
		<View style={[globalStyles.alignItemsCenter, globalStyles.flex1]}>
			<View
				onLayout={handleLayout}
				style={[globalStyles.justifyContentCenter, styles.sliderContainer]}
			>
				<LinearGradient
					colors={color}
					end={{ x: 1, y: 0 }}
					locations={generateGradientLocations(max)}
					start={{ x: 0, y: 0 }}
					style={styles.gradient}
				/>
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.justifyContentStart,
						styles.labelContainer,
						{
							transform: [{ translateX: translateXForIcon }],
						},
					]}
				>
					<Icon color={BaseColor.BLACK} name="place" size={50} />
					<Text preset="regular" style={[globalStyles.mt8, styles.labelText]}>
						{value}
					</Text>
				</View>

				<Planet
					color={gradientColors}
					size="slider"
					style={[
						styles.planet,
						{
							transform: [{ translateX: translateXForPlanet }],
						},
					]}
				/>

				<Slider
					maximumTrackTintColor="transparent"
					maximumValue={max}
					minimumTrackTintColor="transparent"
					minimumValue={min}
					onValueChange={(value) => {
						setValue(value);
						setColor(generateGradientColors(value, gradientColors, max));
					}}
					step={1}
					style={styles.slider}
					thumbTintColor="transparent"
					value={value}
				/>
			</View>
		</View>
	);
};

export { GradientSlider };
