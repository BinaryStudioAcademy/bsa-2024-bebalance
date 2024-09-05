import {
	DOT_RADIUS,
	START_ANGLE,
} from "~/libs/components/balance-wheel-chart/libs/constants/constants.js";
import {
	ChartGraphicsColors,
	WheelCenterDistance,
} from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";
import { type PolarAreaType } from "~/libs/components/balance-wheel-chart/libs/types/types.js";
import { HALF_PI, TAU } from "~/libs/constants/constants.js";
import {
	type ChartArea,
	type ChartMeta,
	type RadialLinearScale,
} from "~/libs/types/types.js";

import { getDotOffset } from "../get-dot-offset/get-dot-offset.helper.js";

const drawDots = ({
	chartArea,
	context,
	index,
	meta,
	middleAngle,
	scale,
}: {
	chartArea: ChartArea;
	context: CanvasRenderingContext2D;
	index: number;
	meta: ChartMeta<PolarAreaType>;
	middleAngle: number;
	scale: RadialLinearScale;
}): void => {
	const segment = meta.data[index];
	const segmentColor = segment
		? (segment.options["backgroundColor"] as CanvasGradient)
		: ChartGraphicsColors.FALLBACK_BACKGROUND_COLOR;

	const dotDistance = scale.getDistanceFromCenterForValue(
		WheelCenterDistance.DOT,
	);
	const dotPosition = {
		x: scale.xCenter + Math.cos(middleAngle - HALF_PI) * dotDistance,
		y: scale.yCenter + Math.sin(middleAngle - HALF_PI) * dotDistance,
	};

	const { offsetX, offsetY } = getDotOffset(dotPosition, chartArea);

	context.beginPath();
	context.arc(
		dotPosition.x - DOT_RADIUS + offsetX,
		dotPosition.y + offsetY,
		DOT_RADIUS,
		START_ANGLE,
		TAU,
	);

	context.fillStyle = segmentColor;
	context.fill();
};

export { drawDots };
