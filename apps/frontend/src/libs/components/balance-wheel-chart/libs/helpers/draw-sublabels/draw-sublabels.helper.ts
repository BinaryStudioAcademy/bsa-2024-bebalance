import { HALF_PI } from "~/libs/constants/constants.js";
import { type ChartArea, type RadialLinearScale } from "~/libs/types/types.js";

import {
	ChartFont,
	ChartGraphicsColor,
	LabelDistacneOffset,
	WheelCenterDistance,
} from "../../enums/enums.js";
import { getBaseline } from "../get-baseline/get-baseline.helper.js";
import { getGraphicsOffset } from "../get-graphics-offset/get-graphics-offset.js";
import { getSublabelOffsetX } from "../get-sublabel-offset-x/get-sublabel-offset-x.helper.js";
import { getSublabelOffsetY } from "../get-sublabel-offset-y/get-sublabel-offset-y.helper.js";

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
			Math.cos(middleAngle - HALF_PI) *
				(sublabelDistance + LabelDistacneOffset.x),
		y:
			scale.yCenter +
			Math.sin(middleAngle - HALF_PI) *
				(sublabelDistance + LabelDistacneOffset.y),
	};

	context.textAlign = "center";
	context.textBaseline = getBaseline(sublabelPosition.y, chartArea);

	const { offsetX, offsetY } = getGraphicsOffset({
		chartArea,
		getOffsetX: getSublabelOffsetX,
		getOffsetY: getSublabelOffsetY,
		graphicsPosition: sublabelPosition,
	});

	context.font = `${String(ChartFont.WEIGHT)} ${String(ChartFont.SUBLABEL_FONT_SIZE)}px ${ChartFont.FAMILY}`;
	context.fillStyle = ChartGraphicsColor.LABELS_COLOR;
	context.fillText(
		label,
		sublabelPosition.x + offsetX,
		sublabelPosition.y + offsetY,
	);
};

export { drawSublabels };
