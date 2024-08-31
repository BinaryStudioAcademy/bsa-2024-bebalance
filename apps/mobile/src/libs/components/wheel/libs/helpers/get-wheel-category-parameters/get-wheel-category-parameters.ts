import { type ValueOf } from "shared";

import { type GradientColor } from "~/libs/enums/enums";

type GetWheelCategoryParameters = (data: {
	categoriesLength: number;
	colors: ValueOf<typeof GradientColor>;
	index: number;
	maxScore: number;
	score: number;
	wheelRadius: number;
}) => {
	endPercent: number;
	gradientId: string;
	gradientUrl: string;
	height: number;
	innerColor: string;
	innerColorOffset: number;
	innerSectorKey: string;
	outerColor: string;
	outerColorOffset: number;
	outerSectorKey: string;
	startPercent: number;
};

const getWheelCategoryParameters: GetWheelCategoryParameters = ({
	categoriesLength,
	colors,
	index,
	maxScore,
	score,
	wheelRadius,
}) => {
	const MAX_PERCENT = 100;
	const INNER_COLOR_OFFSET = 1;
	const OUTER_COLOR_OFFSET = 0;

	const uniqueIndex = index.toString();
	const innerSectorKey = uniqueIndex + "-inner";
	const outerSectorKey = uniqueIndex + "-outer";
	const gradientId = uniqueIndex + "-gradient";
	const gradientUrl = "url(#" + gradientId + ")";
	const [innerColor, outerColor] = colors;

	const sectorArcLengthPercent = MAX_PERCENT / categoriesLength;
	const startPercent = sectorArcLengthPercent * index;
	const endPercent = startPercent + sectorArcLengthPercent;
	const height = (score * wheelRadius) / maxScore;

	return {
		endPercent,
		gradientId,
		gradientUrl,
		height,
		innerColor,
		innerColorOffset: INNER_COLOR_OFFSET,
		innerSectorKey,
		outerColor,
		outerColorOffset: OUTER_COLOR_OFFSET,
		outerSectorKey,
		startPercent,
	};
};

export { getWheelCategoryParameters };
