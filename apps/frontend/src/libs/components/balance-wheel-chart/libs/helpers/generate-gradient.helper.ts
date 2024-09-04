import { type ScriptableContext } from "~/libs/types/types.js";

import { FALLBACK_BACKGROUND_COLOR } from "../constants/constants.js";
import { CHART_SLICE_COLORS } from "../enums/enums.js";

const GRADIENT_SETTING = {
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
		label && label in CHART_SLICE_COLORS
			? CHART_SLICE_COLORS[label as keyof typeof CHART_SLICE_COLORS].start
			: FALLBACK_BACKGROUND_COLOR;

	const colorEnd =
		label && label in CHART_SLICE_COLORS
			? CHART_SLICE_COLORS[label as keyof typeof CHART_SLICE_COLORS].end
			: FALLBACK_BACKGROUND_COLOR;

	const gradient = ctx.createRadialGradient(
		(chartArea.left + chartArea.right) / GRADIENT_SETTING.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GRADIENT_SETTING.CENTER_DIVISOR,
		GRADIENT_SETTING.INITIAL_RADIUS,
		(chartArea.left + chartArea.right) / GRADIENT_SETTING.CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / GRADIENT_SETTING.CENTER_DIVISOR,
		Math.min(
			chartArea.right - chartArea.left,
			chartArea.bottom - chartArea.top,
		) / GRADIENT_SETTING.CENTER_DIVISOR,
	);

	gradient.addColorStop(GRADIENT_SETTING.GRADIENT_STOP_START, colorEnd);
	gradient.addColorStop(GRADIENT_SETTING.GRADIENT_STOP_END, colorStart);

	return gradient;
};

export { generateGradientColor };
