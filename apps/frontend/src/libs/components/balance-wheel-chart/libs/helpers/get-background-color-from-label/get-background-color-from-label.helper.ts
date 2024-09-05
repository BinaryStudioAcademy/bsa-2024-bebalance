import {
	ChartGraphicsColor,
	ChartSliceColor,
} from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getBackgroundColorFromLabel = (
	label?: string,
): {
	end: string;
	start: string;
} => {
	if (!label) {
		return {
			end: ChartGraphicsColor.FALLBACK_BACKGROUND_COLOR,
			start: ChartGraphicsColor.FALLBACK_BACKGROUND_COLOR,
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
		end: ChartGraphicsColor.FALLBACK_BACKGROUND_COLOR,
		start: ChartGraphicsColor.FALLBACK_BACKGROUND_COLOR,
	};
};

export { getBackgroundColorFromLabel };
