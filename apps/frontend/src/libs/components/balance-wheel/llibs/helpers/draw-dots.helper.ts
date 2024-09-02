import { type ChartMeta, type RadialLinearScale } from "chart.js";
import { HALF_PI, TAU } from "chart.js/helpers";

import {
	DOT_RADIUS,
	FALLBACK_BACKGROUND_COLOR,
	START_ANGLE,
} from "../constants/constants.js";
import { WheelCenterDistance } from "../enums/enums.js";

const drawDots = ({
	context,
	index,
	meta,
	middleAngle,
	scale,
}: {
	context: CanvasRenderingContext2D;
	index: number;
	meta: ChartMeta<"polarArea">;
	middleAngle: number;
	scale: RadialLinearScale;
}): void => {
	const segment = meta.data[index];
	const segmentColor = segment
		? (segment.options["backgroundColor"] as CanvasGradient)
		: FALLBACK_BACKGROUND_COLOR;

	const dotDistance = scale.getDistanceFromCenterForValue(
		WheelCenterDistance.DOT,
	);
	const dotPosition = {
		x: scale.xCenter + Math.cos(middleAngle - HALF_PI) * dotDistance,
		y: scale.yCenter + Math.sin(middleAngle - HALF_PI) * dotDistance,
	};

	context.beginPath();
	context.arc(
		dotPosition.x - DOT_RADIUS,
		dotPosition.y,
		DOT_RADIUS,
		START_ANGLE,
		TAU,
	);

	context.fillStyle = segmentColor;
	context.fill();
};

export { drawDots };
