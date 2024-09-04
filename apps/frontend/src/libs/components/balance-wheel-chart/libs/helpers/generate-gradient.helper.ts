import { type ScriptableContext } from "~/libs/types/types.js";

import { FALLBACK_BACKGROUND_COLOR } from "../constants/constants.js";
import { ChartSliceColor } from "../enums/enums.js";

const GradientSetting = {
	CENTER_DIVISOR: 2,
	GRADIENT_STOP_END: 1,
	GRADIENT_STOP_START: 0.1,
	INITIAL_RADIUS: 0,
} as const;

const generateGradientColor = (
	context: ScriptableContext<"doughnut">,
): CanvasGradient => {
	const { chart, dataIndex } = context;
	const { chartArea, ctx } = chart;
	const { labels } = chart.data;

	const label = labels?.[dataIndex]
		?.toString()
		.toUpperCase()
		.replaceAll(/\s+/g, "_");

	const colorStart =
		label && label in ChartSliceColor
			? ChartSliceColor[label as keyof typeof ChartSliceColor].start
			: FALLBACK_BACKGROUND_COLOR;

	const colorEnd =
		label && label in ChartSliceColor
			? ChartSliceColor[label as keyof typeof ChartSliceColor].end
			: FALLBACK_BACKGROUND_COLOR;

	const gradient = ctx.createRadialGradient(
		(chartArea.left + chartArea.right) / GradientSetting.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GradientSetting.CENTER_DIVISOR,
		GradientSetting.INITIAL_RADIUS,
		(chartArea.left + chartArea.right) / GradientSetting.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GradientSetting.CENTER_DIVISOR,
		Math.min(
			chartArea.right - chartArea.left,
			chartArea.bottom - chartArea.top,
		) / GradientSetting.CENTER_DIVISOR,
	);

	gradient.addColorStop(GradientSetting.GRADIENT_STOP_START, colorEnd);
	gradient.addColorStop(GradientSetting.GRADIENT_STOP_END, colorStart);

	return gradient;
};

export { generateGradientColor };
