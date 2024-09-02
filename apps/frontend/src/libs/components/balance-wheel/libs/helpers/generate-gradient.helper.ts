import { type ScriptableContext } from "~/libs/types/types.js";

import { FALLBACK_BACKGROUND_COLOR } from "../constants/constants.js";
import { BACKGROUND_COLORS } from "../enums/enums.js";

const CENTER_DIVISOR = 2;
const INITIAL_RADIUS = 0;
const GRADIENT_STOP_START = 0.1;
const GRADIENT_STOP_END = 1;

const generateGradientColor = (
	context: ScriptableContext<"doughnut">,
): CanvasGradient => {
	const { dataIndex } = context;
	const colorStart =
		BACKGROUND_COLORS[dataIndex]?.start ?? FALLBACK_BACKGROUND_COLOR;
	const colorEnd =
		BACKGROUND_COLORS[dataIndex]?.end ?? FALLBACK_BACKGROUND_COLOR;

	const { chart } = context;
	const { chartArea, ctx } = chart;

	const gradient = ctx.createRadialGradient(
		(chartArea.left + chartArea.right) / CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / CENTER_DIVISOR,
		INITIAL_RADIUS,
		(chartArea.left + chartArea.right) / CENTER_DIVISOR,
		(chartArea.top + chartArea.bottom) / CENTER_DIVISOR,
		Math.min(
			chartArea.right - chartArea.left,
			chartArea.bottom - chartArea.top,
		) / CENTER_DIVISOR,
	);

	gradient.addColorStop(GRADIENT_STOP_START, colorEnd);
	gradient.addColorStop(GRADIENT_STOP_END, colorStart);

	return gradient;
};

export { generateGradientColor };
