import React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { BaseColor } from "~/libs/enums/enums";
import { type WheelDataItem } from "~/libs/types/types";

import { WheelSetting } from "./libs/enums/enums";
import { getWheelSectorParameters } from "./libs/helpers/helpers";

type Properties = {
	categoriesData: WheelDataItem[];
	maxScore: number;
	size: number;
};

const Wheel: React.FC<Properties> = ({ categoriesData, maxScore, size }) => {
	const TWO = 2;
	const ZERO = 0;
	const FULL_WIDTH = "100%";
	const wheelRadius = size / TWO;

	const Sectors = categoriesData.map(
		({ colors, label, score }, index, array) => {
			const startPercent = index / array.length;
			const endPercent = (index + WheelSetting.INDEX_STEP) / array.length;
			const height = (score * wheelRadius) / maxScore;

			const {
				dashArrayDash: outerArrayDash,
				dashArrayGap: outerArrayGap,
				dashOffset: outerDashOffset,
				radius: outerRadius,
				strokeWidth: outerStrokeWidth,
			} = getWheelSectorParameters({
				endPercent,
				height,
				layerOffset: ZERO,
				spaceCoefficient: size * WheelSetting.HOLE_SIZE_PERCENT,
				startPercent,
			});

			const {
				dashArrayDash: innerArrayDash,
				dashArrayGap: innerArrayGap,
				dashOffset: innerDashOffset,
				radius: innerRadius,
				strokeWidth: innerStrokeWidth,
			} = getWheelSectorParameters({
				endPercent,
				height,
				layerOffset: size * WheelSetting.SPACING_SIZE_PERCENT,
				spaceCoefficient: size * WheelSetting.HOLE_SIZE_PERCENT,
				startPercent,
			});

			return (
				<React.Fragment key={label + index.toString()}>
					<Circle
						cx={wheelRadius}
						cy={wheelRadius}
						fill="none"
						key={index}
						origin={[ZERO, ZERO]}
						r={outerRadius}
						stroke={BaseColor.BG_WHITE}
						strokeDasharray={[outerArrayDash, outerArrayGap]}
						strokeDashoffset={outerDashOffset}
						strokeWidth={outerStrokeWidth}
					/>
					<Defs>
						<LinearGradient
							id={index.toString()}
							x1={ZERO}
							x2={FULL_WIDTH}
							y1={ZERO}
							y2={FULL_WIDTH}
						>
							{colors.map((color, index) => {
								return <Stop key={index} offset={index} stopColor={color} />;
							})}
						</LinearGradient>
					</Defs>
					<Circle
						cx={wheelRadius}
						cy={wheelRadius}
						fill="none"
						key={label}
						origin={[ZERO, ZERO]}
						r={innerRadius}
						stroke={"url(#" + index.toString() + ")"}
						strokeDasharray={[innerArrayDash, innerArrayGap]}
						strokeDashoffset={innerDashOffset}
						strokeWidth={innerStrokeWidth}
					/>
				</React.Fragment>
			);
		},
	);

	return (
		<Svg height={size} width={size}>
			{Sectors}
		</Svg>
	);
};

export { Wheel };
