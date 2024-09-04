import { HALF_PI } from "~/libs/constants/constants.js";
import { type ChartArea, type RadialLinearScale } from "~/libs/types/types.js";

import {
	ChartFont,
	ChartGraphicsColors,
	SublabelOffset,
	WheelCenterDistance,
} from "../enums/enums.js";
import { getBaseline, getSublabelOffset } from "./helpers.js";

const drawSublabels = ({
	chartArea,
	context,
	label,
	middleAngle,
	scale,
}: {
	chartArea: ChartArea;
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

	context.textAlign = "center";
	context.textBaseline = getBaseline(sublabelPosition.y, chartArea);

	const { offsetX, offsetY } = getSublabelOffset(sublabelPosition, chartArea);

	context.font = `${String(ChartFont.WEIGHT)} ${String(ChartFont.SUBLABEL_FONT_SIZE)}px ${ChartFont.FAMILY}`;
	context.fillStyle = ChartGraphicsColors.LABELS_COLOR;
	context.fillText(
		label,
		sublabelPosition.x + offsetX,
		sublabelPosition.y + offsetY,
	);
};

export { drawSublabels };
