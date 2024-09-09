import { type GradientColor } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

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
	outerColor: string;
	outerColorOffset: number;
	sectorKey: string;
	startPercent: number;
};

const MAX_PERCENT = 100;
const INNER_COLOR_OFFSET = 1;
const OUTER_COLOR_OFFSET = 0;

const getWheelCategoryParameters: GetWheelCategoryParameters = ({
	categoriesLength,
	colors,
	index,
	maxScore,
	score,
	wheelRadius,
}) => {
	const uniqueIndex = index.toString();
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
		outerColor,
		outerColorOffset: OUTER_COLOR_OFFSET,
		sectorKey: uniqueIndex,
		startPercent,
	};
};

export { getWheelCategoryParameters };
