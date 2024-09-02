import { type ScriptableContext } from "chart.js";

import {
	MAX_SLICE_VALUE,
	SINGLE_ELEMENT,
	SLICE_COLORS,
} from "../constants/constants.js";
import { ChartGraphicsColors } from "../enums/enums.js";

const GradientParameters = {
	CENTER_DIVISOR: 2,
	GRADIENT_STOP_END: 1,
	GRADIENT_STOP_START: 0.1,
	INITIAL_RADIUS: 0,
} as const;

const generateGradientColor = (
	context: ScriptableContext<"doughnut">,
): CanvasGradient => {
	const { raw } = context;
	const sliceValue = raw as number;
	const sliceColorIndex =
		Math.round((sliceValue * SLICE_COLORS.length) / MAX_SLICE_VALUE) -
		SINGLE_ELEMENT;

	const colorStart =
		SLICE_COLORS[sliceColorIndex]?.start ??
		ChartGraphicsColors.FALLBACK_BACKGROUND_COLOR;
	const colorEnd =
		SLICE_COLORS[sliceColorIndex]?.end ??
		ChartGraphicsColors.FALLBACK_BACKGROUND_COLOR;

	const { chart } = context;
	const { chartArea, ctx } = chart;

	const gradient = ctx.createRadialGradient(
		(chartArea.left + chartArea.right) / GradientParameters.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GradientParameters.CENTER_DIVISOR,
		GradientParameters.INITIAL_RADIUS,
		(chartArea.left + chartArea.right) / GradientParameters.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GradientParameters.CENTER_DIVISOR,
		Math.min(
			chartArea.right - chartArea.left,
			chartArea.bottom - chartArea.top,
		) / GradientParameters.CENTER_DIVISOR,
	);

	gradient.addColorStop(GradientParameters.GRADIENT_STOP_START, colorEnd);
	gradient.addColorStop(GradientParameters.GRADIENT_STOP_END, colorStart);

	return gradient;
};

export { generateGradientColor };
