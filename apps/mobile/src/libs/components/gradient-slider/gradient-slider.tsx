import Slider from "@react-native-community/slider";
import React from "react";

import {
	Icon,
	LinearGradient,
	SliderSection,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import {
	generateSliderGradientColors,
	generateSliderGradientLocations,
} from "~/libs/helpers/helpers";
import { useCallback, useState } from "~/libs/hooks/hooks";
import {
	type colorToGradientColors,
	directionToGradient,
} from "~/libs/maps/maps";
import { globalStyles } from "~/libs/styles/styles";
import { type LayoutChangeEvent } from "~/libs/types/types";

import {
	SLIDER_INITIAL_WIDTH,
	SLIDER_MAX_PERCENT,
	SLIDER_STEP_VALUE,
} from "./libs/constants/slider-config";
import {
	SLIDER_ICON_TRANSLATE_OFFSET,
	SLIDER_MARKER_ICON_SIZE,
	SLIDER_SECTION_TRANSLATE_OFFSET,
} from "./libs/constants/slider-styles";
import { styles } from "./styles";

type Properties = {
	gradientColors: keyof typeof colorToGradientColors;
	max: number;
	min: number;
	onValueChange?: (value: number) => void;
};

const GradientSlider: React.FC<Properties> = ({
	gradientColors,
	max,
	min,
	onValueChange,
}) => {
	const [value, setValue] = useState<number>(min);
	const [sliderWidth, setSliderWidth] = useState<number>(SLIDER_INITIAL_WIDTH);
	const initialColors = generateSliderGradientColors(min, gradientColors, max);
	const [color, setColor] = useState<string[]>(initialColors);

	const handleLayout = useCallback((event: LayoutChangeEvent): void => {
		const { width } = event.nativeEvent.layout;
		setSliderWidth(width);
	}, []);

	const handleValueChange = useCallback(
		(sliderValue: number) => {
			setValue(sliderValue);
			setColor(generateSliderGradientColors(sliderValue, gradientColors, max));

			if (onValueChange) {
				onValueChange(sliderValue);
			}
		},
		[gradientColors, max, onValueChange],
	);

	const pixelsPerPercent = sliderWidth / SLIDER_MAX_PERCENT;
	const translateXBase = (value / max) * SLIDER_MAX_PERCENT * pixelsPerPercent;

	const translateXForSliderSection =
		translateXBase - SLIDER_SECTION_TRANSLATE_OFFSET;
	const translateXForIcon = translateXBase - SLIDER_ICON_TRANSLATE_OFFSET;

	const { end, start } = directionToGradient.leftToRight;

	return (
		<View style={[globalStyles.alignItemsCenter, globalStyles.flex1]}>
			<View
				onLayout={handleLayout}
				style={[globalStyles.justifyContentCenter, styles.sliderContainer]}
			>
				<LinearGradient
					colors={color}
					end={end}
					locations={generateSliderGradientLocations(max)}
					start={start}
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
					<Icon
						color={BaseColor.BLACK}
						name="place"
						size={SLIDER_MARKER_ICON_SIZE}
					/>
					<Text preset="regular" style={[globalStyles.mt12, styles.labelText]}>
						{value}
					</Text>
				</View>

				<SliderSection
					color={gradientColors}
					style={[
						styles.sliderSection,
						{
							transform: [{ translateX: translateXForSliderSection }],
						},
					]}
				/>

				<Slider
					maximumTrackTintColor="transparent"
					maximumValue={max}
					minimumTrackTintColor="transparent"
					minimumValue={min}
					onValueChange={handleValueChange}
					step={SLIDER_STEP_VALUE}
					style={styles.slider}
					thumbTintColor="transparent"
					value={value}
				/>
			</View>
		</View>
	);
};

export { GradientSlider };
