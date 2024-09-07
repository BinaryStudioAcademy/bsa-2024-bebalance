import { HALF_PI } from "~/libs/constants/constants.js";

import {
	ChartFont,
	ChartGraphicsColor,
	LabelDistacneOffset,
	WheelCenterDistance,
} from "../../enums/enums.js";
import { type ChartLabelsData } from "../../types/types.js";
import { getBaseline } from "../get-baseline/get-baseline.helper.js";
import { getGraphicsOffset } from "../get-graphics-offset/get-graphics-offset.js";
import { getValueLabelOffsetX } from "../get-value-label-offset-x/get-value-label-offset-x.helper.js";
import { getValueLabelOffsetY } from "../get-value-label-offset-y/get-value-label-offset-y.helper.js";

const drawValueLabels = ({
	chartArea,
	context,
	label,
	middleAngle,
	scale,
}: ChartLabelsData): void => {
	const labelDistance = scale.getDistanceFromCenterForValue(
		WheelCenterDistance.VALUE_LABEL,
	);

	const valueLabelPosition = {
		x:
			scale.xCenter +
			Math.cos(middleAngle - HALF_PI) * (labelDistance + LabelDistacneOffset.x),
		y:
			scale.yCenter +
			Math.sin(middleAngle - HALF_PI) * (labelDistance + LabelDistacneOffset.y),
	};

	context.textAlign = "center";
	context.textBaseline = getBaseline(valueLabelPosition.y, chartArea);

	const { offsetX, offsetY } = getGraphicsOffset({
		chartArea,
		getOffsetX: getValueLabelOffsetX,
		getOffsetY: getValueLabelOffsetY,
		graphicsPosition: valueLabelPosition,
	});

	context.font = `${String(ChartFont.WEIGHT)} ${String(ChartFont.LABEL_FONT_SIZE)}px ${ChartFont.FAMILY}`;
	context.fillStyle = ChartGraphicsColor.LABELS_COLOR;
	context.fillText(
		label,
		valueLabelPosition.x + offsetX,
		valueLabelPosition.y + offsetY,
	);
};

export { drawValueLabels };
