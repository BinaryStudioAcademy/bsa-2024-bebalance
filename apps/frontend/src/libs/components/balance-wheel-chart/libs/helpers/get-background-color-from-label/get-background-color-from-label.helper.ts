import { FALLBACK_BACKGROUND_COLOR } from "~/libs/components/balance-wheel-chart/libs/constants/constants.js";
import { ChartSliceColor } from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getBackgroundColorFromLabel = (
	label?: string,
): {
	end: string;
	start: string;
} => {
	if (!label) {
		return {
			end: FALLBACK_BACKGROUND_COLOR,
			start: FALLBACK_BACKGROUND_COLOR,
		};
	}

	const formattedLabel = label
		.toUpperCase()
		.replaceAll(/\s+/g, "_") as keyof typeof ChartSliceColor;

	if (formattedLabel in ChartSliceColor) {
		return {
			end: ChartSliceColor[formattedLabel].end,
			start: ChartSliceColor[formattedLabel].start,
		};
	}

	return {
		end: FALLBACK_BACKGROUND_COLOR,
		start: FALLBACK_BACKGROUND_COLOR,
	};
};

export { getBackgroundColorFromLabel };
