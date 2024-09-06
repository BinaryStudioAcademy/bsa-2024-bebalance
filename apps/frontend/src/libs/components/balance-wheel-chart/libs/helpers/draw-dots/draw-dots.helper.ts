import { HALF_PI, TAU } from "~/libs/constants/constants.js";
import {
	type ChartArea,
	type ChartMeta,
	type RadialLinearScale,
} from "~/libs/types/types.js";

import { DOT_RADIUS, START_ANGLE } from "../../constants/constants.js";
import { ChartGraphicsColor, WheelCenterDistance } from "../../enums/enums.js";
import { type PolarAreaType } from "../../types/types.js";
import { getDotOffsetX } from "../get-dot-offset-x/get-dot-offset-x.helper.js";
import { getDotOffsetY } from "../get-dot-offset-y/get-dot-offset-y.helper.js";
import { getGraphicsOffset } from "../get-graphics-offset/get-graphics-offset.js";

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
		: ChartGraphicsColor.FALLBACK_BACKGROUND_COLOR;

	const dotDistance = scale.getDistanceFromCenterForValue(
		WheelCenterDistance.DOT,
	);
	const dotPosition = {
		x: scale.xCenter + Math.cos(middleAngle - HALF_PI) * dotDistance,
		y: scale.yCenter + Math.sin(middleAngle - HALF_PI) * dotDistance,
	};

	const { offsetX, offsetY } = getGraphicsOffset({
		chartArea,
		getOffsetX: getDotOffsetX,
		getOffsetY: getDotOffsetY,
		graphicsPosition: dotPosition,
	});

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
