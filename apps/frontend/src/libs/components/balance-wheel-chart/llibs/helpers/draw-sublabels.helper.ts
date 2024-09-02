import { HALF_PI } from "~/libs/constants/constants.js";
import { type Chart, type RadialLinearScale } from "~/libs/types/types.js";

import {
	ChartFont,
	ChartGraphicsColors,
	SublabelOffset,
	WheelCenterDistance,
} from "../enums/enums.js";
import { type PolarAreaType } from "../types/types.js";
import { getAlignment, getBaseline } from "./helpers.js";

const drawSublabels = ({
	chart,
	context,
	label,
	middleAngle,
	scale,
}: {
	chart: Chart<PolarAreaType>;
	context: CanvasRenderingContext2D;
	label: string;
	middleAngle: number;
	scale: RadialLinearScale;
}): void => {
	const sublabelDistance = scale.getDistanceFromCenterForValue(
		WheelCenterDistance.SUBLABEL,
	);
	const sublabelPosition = {
		x:
			scale.xCenter +
			Math.cos(middleAngle - HALF_PI) * (sublabelDistance + SublabelOffset.x),
		y:
			scale.yCenter +
			Math.sin(middleAngle - HALF_PI) * (sublabelDistance + SublabelOffset.y),
	};

	context.textAlign = getAlignment(sublabelPosition.x, chart.chartArea);
	context.textBaseline = getBaseline(sublabelPosition.y, chart.chartArea);

	context.font = `${String(ChartFont.WEIGHT)} ${String(ChartFont.SUBLABEL_FONT_SIZE)}px ${ChartFont.FAMILY}`;
	context.fillStyle = ChartGraphicsColors.LABELS_COLOR;
	context.fillText(label, sublabelPosition.x, sublabelPosition.y);
};

export { drawSublabels };
