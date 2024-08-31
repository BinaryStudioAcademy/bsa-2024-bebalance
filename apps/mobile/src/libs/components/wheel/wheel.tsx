import React from "react";
import { getRadiansFromPercent } from "shared";

import { Defs, Stop, Svg, SvgGradient } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { type WheelDataItem } from "~/libs/types/types";

import { AnimatedSector, LabelOnCircle } from "./libs/components/components";
import { WheelSetting } from "./libs/enums/enums";
import { getWheelCategoryParameters } from "./libs/helpers/helpers";

type Properties = {
	categoriesData: WheelDataItem[];
	isLabelShown?: boolean;
	maxScore: number;
	size: number;
};

const Wheel: React.FC<Properties> = ({
	categoriesData,
	isLabelShown = true,
	maxScore,
	size,
}: Properties) => {
	const MINIFY_TWICE_COEFFICIENT = 0.5;
	const ANIMATION_TIME = 500;

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
				innerSectorKey,
				outerColor,
				outerColorOffset,
				outerSectorKey,
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
			const layerOsffsetInner =
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

					<AnimatedSector
						animationTime={ANIMATION_TIME}
						centerGap={wheelCenterGapSize}
						centerPoint={centerPoint}
						endPercent={endPercent}
						height={height}
						key={outerSectorKey}
						layerOffset={WheelSetting.INITIAL_POSITION}
						startPercent={startPercent}
						stroke={BaseColor.BG_WHITE}
					/>
					<AnimatedSector
						animationTime={ANIMATION_TIME}
						centerGap={wheelCenterGapSize}
						centerPoint={centerPoint}
						endPercent={endPercentInner}
						height={height}
						key={innerSectorKey}
						layerOffset={layerOsffsetInner}
						startPercent={startPercentInner}
						stroke={gradientUrl}
					/>
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
