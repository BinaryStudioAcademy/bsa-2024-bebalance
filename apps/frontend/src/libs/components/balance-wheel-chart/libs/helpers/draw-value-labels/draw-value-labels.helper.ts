import {
	ChartFont,
	ChartGraphicsColors,
	LabelDistacneOffset,
	WheelCenterDistance,
} from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";
import { HALF_PI } from "~/libs/constants/constants.js";
import { type ChartArea, type RadialLinearScale } from "~/libs/types/types.js";

import { getBaseline } from "../get-baseline/get-baseline.helper.js";
import { getLabelOffset } from "../get-label-offset/get-label-offset.helper.js";

const drawValueLabels = ({
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
		WheelCenterDistance.VALUE_LABEL,
	);

	const sublabelPosition = {
		x:
			scale.xCenter +
			Math.cos(middleAngle - HALF_PI) *
				(sublabelDistance + LabelDistacneOffset.x),
		y:
			scale.yCenter +
			Math.sin(middleAngle - HALF_PI) *
				(sublabelDistance + LabelDistacneOffset.y),
	};

	context.textAlign = "center";
	context.textBaseline = getBaseline(sublabelPosition.y, chartArea);

	const { offsetX, offsetY } = getLabelOffset(sublabelPosition, chartArea);

	context.font = `${String(ChartFont.WEIGHT)} ${String(ChartFont.LABEL_FONT_SIZE)}px ${ChartFont.FAMILY}`;
	context.fillStyle = ChartGraphicsColors.LABELS_COLOR;
	context.fillText(
		label,
		sublabelPosition.x + offsetX,
		sublabelPosition.y + offsetY,
	);
};

export { drawValueLabels };
