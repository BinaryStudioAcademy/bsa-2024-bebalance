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

import { SliderConfig, SliderStyle } from "./libs/enums/enums";
import { styles } from "./styles";

type Properties = {
	gradientColors: keyof typeof colorToGradientColors;
	id: number;
	max: number;
	onValueChange: (categoryId: number, value: number) => void;
	value: number;
};

const GradientSlider: React.FC<Properties> = ({
	gradientColors,
	id,
	max,
	onValueChange,
	value,
}) => {
	const [sliderValue, setSliderValue] = useState<number>(value);
	const [sliderWidth, setSliderWidth] = useState<number>(
		SliderConfig.INITIAL_WIDTH,
	);
	const initialColors = generateSliderGradientColors(
		value,
		gradientColors,
		max,
	);
	const [color, setColor] = useState<string[]>(initialColors);

	const handleLayout = useCallback((event: LayoutChangeEvent): void => {
		const { width } = event.nativeEvent.layout;
		setSliderWidth(width);
	}, []);

	const handleValueChange = useCallback(
		(sliderValue: number) => {
			setSliderValue(sliderValue);
			setColor(generateSliderGradientColors(sliderValue, gradientColors, max));

			onValueChange(id, sliderValue);
		},
		[gradientColors, id, max, onValueChange],
	);

	const pixelsPerPercent = sliderWidth / SliderConfig.MAX_PERCENT;
	const translateXBase =
		(sliderValue / max) * SliderConfig.MAX_PERCENT * pixelsPerPercent;

	const translateXForSliderSection =
		translateXBase - SliderStyle.SECTION_TRANSLATE_OFFSET;
	const translateXForIcon = translateXBase - SliderStyle.ICON_TRANSLATE_OFFSET;

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
						name="fmd-good"
						size={SliderStyle.MARKER_ICON_SIZE}
					/>
					<Text
						size="sm"
						style={[globalStyles.mt8, styles.labelText]}
						weight="bold"
					>
						{sliderValue}
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
					hitSlop={{
						bottom: SliderConfig.HIT_SLOP_VERTICAL,
						left: SliderConfig.HIT_SLOP_HORIZONTAL,
						right: SliderConfig.HIT_SLOP_VERTICAL,
						top: SliderConfig.HIT_SLOP_HORIZONTAL,
					}}
					maximumTrackTintColor="transparent"
					maximumValue={max}
					minimumTrackTintColor="transparent"
					minimumValue={SliderConfig.MIN_VALUE}
					onValueChange={handleValueChange}
					step={SliderConfig.STEP_VALUE}
					style={styles.slider}
					thumbTintColor="transparent"
					value={sliderValue}
				/>
			</View>
		</View>
	);
};

export { GradientSlider };
