import React from "react";

import { Defs, Stop, Svg, SvgGradient } from "~/libs/components/components";
import { AnimationName, BaseColor } from "~/libs/enums/enums";
import { useEffect, useState } from "~/libs/hooks/hooks";
import { type ValueOf, type WheelDataItem } from "~/libs/types/types";

import {
	AnimatedAppearingSector,
	AnimatedPulsingSector,
	LabelOnCircle,
} from "./libs/components/components";
import {
	MAX_SCORE,
	MINIFY_TWICE_COEFFICIENT,
} from "./libs/constants/constants";
import { AnimationDefaultSetting, WheelSetting } from "./libs/enums/enums";
import {
	getRadiansFromPercent,
	getWheelCategoryParameters,
} from "./libs/helpers/helpers";

type Properties = {
	animation?: ValueOf<typeof AnimationName>;
	animationDuration?: number;
	animationRepetitions?: number;
	categoriesData?: WheelDataItem[];
	isLabelShown?: boolean;
	maxScore?: number;
	size: number;
};

const Wheel: React.FC<Properties> = ({
	animation = AnimationName.APPEAR,
	animationDuration = AnimationDefaultSetting.DURATION,
	animationRepetitions = AnimationDefaultSetting.REPETITIONS,
	categoriesData = [],
	isLabelShown = true,
	maxScore = MAX_SCORE,
	size,
}: Properties) => {
	const wheelRadius = size * MINIFY_TWICE_COEFFICIENT;
	const outerSize = isLabelShown
		? (size * WheelSetting.OUTER_SIZE_PERCENT) / WheelSetting.MAX_PERCENT
		: size;
	const centerPoint = outerSize * MINIFY_TWICE_COEFFICIENT;

	const [repetition, setRepetition] = useState<number>(
		AnimationDefaultSetting.REPETITIONS,
	);

	useEffect(() => {
		if (repetition < animationRepetitions) {
			setTimeout(() => {
				setRepetition(repetition + AnimationDefaultSetting.REPETITION_STEP);
			}, animationDuration);
		}
	}, [animationRepetitions, animationDuration, repetition]);

	const Sectors = categoriesData.map(
		({ colors, label, score }, index, array) => {
			const {
				endPercent,
				gradientId,
				gradientUrl,
				height,
				innerColor,
				innerColorOffset,
				outerColor,
				outerColorOffset,
				sectorKey,
				startPercent,
			} = getWheelCategoryParameters({
				categoriesLength: array.length,
				colors,
				index,
				maxScore,
				score,
				wheelRadius,
			});

			const pointAngleRadians = getRadiansFromPercent(
				startPercent +
					(WheelSetting.MAX_PERCENT * MINIFY_TWICE_COEFFICIENT) / array.length,
			);

			const wheelCenterGapSize =
				(size * WheelSetting.HOLE_SIZE_PERCENT) / WheelSetting.MAX_PERCENT;
			const layerOffsetInner =
				(size * WheelSetting.SPACING_SIZE_PERCENT) / WheelSetting.MAX_PERCENT;
			const wheelPercentAdjustment =
				WheelSetting.SPACING_SIZE_PERCENT * MINIFY_TWICE_COEFFICIENT;
			const startPercentOuter = startPercent - wheelPercentAdjustment;
			const endPercentOuter = endPercent + wheelPercentAdjustment;
			const startPercentInner = startPercent + wheelPercentAdjustment;
			const endPercentInner = endPercent - wheelPercentAdjustment;

			return (
				<React.Fragment key={index}>
					<Defs>
						<SvgGradient id={gradientId}>
							<Stop offset={innerColorOffset} stopColor={innerColor} />
							<Stop offset={outerColorOffset} stopColor={outerColor} />
						</SvgGradient>
					</Defs>
					{isLabelShown && (
						<LabelOnCircle
							centerPoint={centerPoint}
							circleColor={gradientUrl}
							pointAngleRadians={pointAngleRadians}
							score={score}
							text={label}
							wheelRadius={wheelRadius}
						/>
					)}
					{animation === AnimationName.PULSE && (
						<AnimatedPulsingSector
							animationDuration={animationDuration}
							animationRepetitions={repetition}
							centerGap={wheelCenterGapSize}
							centerPoint={centerPoint}
							endPercentInner={endPercentInner}
							endPercentOuter={endPercentOuter}
							height={height}
							key={sectorKey}
							layerOffset={layerOffsetInner}
							maxHeight={wheelRadius}
							outlineColor={BaseColor.BG_WHITE}
							sectorColor={gradientUrl}
							startPercentInner={startPercentInner}
							startPercentOuter={startPercentOuter}
						/>
					)}
					{animation === AnimationName.APPEAR && (
						<AnimatedAppearingSector
							animationDuration={animationDuration}
							animationRepetitions={repetition}
							centerGap={wheelCenterGapSize}
							centerPoint={centerPoint}
							endPercentInner={endPercentInner}
							endPercentOuter={endPercentOuter}
							height={height}
							key={sectorKey}
							layerOffset={layerOffsetInner}
							outlineColor={BaseColor.BG_WHITE}
							sectorColor={gradientUrl}
							startPercentInner={startPercentInner}
							startPercentOuter={startPercentOuter}
						/>
					)}
				</React.Fragment>
			);
		},
	);

	return (
		<Svg height={outerSize} width={outerSize}>
			{Sectors}
		</Svg>
	);
};

export { Wheel };
