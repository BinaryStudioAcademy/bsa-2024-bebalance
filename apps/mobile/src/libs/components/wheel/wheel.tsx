import React from "react";

import { Defs, Stop, Svg, SvgGradient } from "~/libs/components/components";
import { AnimationName, BaseColor } from "~/libs/enums/enums";
import { type ValueOf, type WheelDataItem } from "~/libs/types/types";

import {
	AnimatedAppearingSector,
	AnimatedPulsingSector,
	LabelOnCircle,
} from "./libs/components/components";
import { WheelSetting } from "./libs/enums/enums";
import {
	getRadiansFromPercent,
	getWheelCategoryParameters,
} from "./libs/helpers/helpers";

type Properties = {
	animation?: ValueOf<typeof AnimationName>;
	categoriesData: WheelDataItem[];
	isLabelShown?: boolean;
	maxScore?: number;
	size: number;
};

const MINIFY_TWICE_COEFFICIENT = 0.5;
const MAX_SCORE = 10;
const ANIMATION_TIME = 1000;

const Wheel: React.FC<Properties> = ({
	animation = AnimationName.APPEAR,
	categoriesData,
	isLabelShown = true,
	maxScore = MAX_SCORE,
	size,
}: Properties) => {
	const wheelRadius = size * MINIFY_TWICE_COEFFICIENT;
	const outerSize = isLabelShown
		? (size * WheelSetting.OUTER_SIZE_PERCENT) / WheelSetting.MAX_PERCENT
		: size;
	const centerPoint = outerSize * MINIFY_TWICE_COEFFICIENT;

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
			const startPercentInner =
				startPercent +
				WheelSetting.SPACING_SIZE_PERCENT * MINIFY_TWICE_COEFFICIENT;
			const endPercentInner =
				endPercent -
				WheelSetting.SPACING_SIZE_PERCENT * MINIFY_TWICE_COEFFICIENT;

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
							animationTime={ANIMATION_TIME}
							centerGap={wheelCenterGapSize}
							centerPoint={centerPoint}
							endPercentInner={endPercentInner}
							endPercentOuter={endPercent}
							height={height}
							key={sectorKey}
							layerOffset={layerOffsetInner}
							maxHeight={wheelRadius}
							outlineColor={BaseColor.BG_WHITE}
							sectorColor={gradientUrl}
							startPercentInner={startPercentInner}
							startPercentOuter={startPercent}
						/>
					)}
					{animation === AnimationName.APPEAR && (
						<AnimatedAppearingSector
							animationTime={ANIMATION_TIME}
							centerGap={wheelCenterGapSize}
							centerPoint={centerPoint}
							endPercentInner={endPercentInner}
							endPercentOuter={endPercent}
							height={height}
							key={sectorKey}
							layerOffset={layerOffsetInner}
							outlineColor={BaseColor.BG_WHITE}
							sectorColor={gradientUrl}
							startPercentInner={startPercentInner}
							startPercentOuter={startPercent}
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
