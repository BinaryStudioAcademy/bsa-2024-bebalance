import { type PolarAreaType } from "~/libs/components/balance-wheel-chart/libs/types/types.js";
import { TAU, ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	type Chart,
	type ChartDataset,
	type RadialLinearScale,
} from "~/libs/types/types.js";

import { drawDots } from "../draw-dots/draw-dots.helper.js";
import { drawSublabels } from "../draw-sublabels/draw-sublabels.helper.js";
import { drawValueLabels } from "../draw-value-labels/draw-value-labels.helper.js";
import { getMiddleAngle } from "../get-middle-angle/get-middle-angle.helper.js";

const drawExtraPointGraphics = (chart: Chart<PolarAreaType>): void => {
	const { ctx: context } = chart;
	const scale = chart.scales["r"] as RadialLinearScale;
	const meta = chart.getDatasetMeta(ZERO_INDEX);
	const { chartArea } = chart;

	const sublabels = chart.data.labels as string[];
	const dataset = chart.data.datasets[ZERO_INDEX] as ChartDataset<
		PolarAreaType,
		number[]
	>;
	const values = dataset.data;

	const angleStep = TAU / sublabels.length;

	for (const [index, value] of values.entries()) {
		const middleAngle = getMiddleAngle(index, angleStep);
		const label = String(value);

		drawValueLabels({
			chartArea,
			context,
			label,
			middleAngle,
			scale,
		});
	}

	for (const [index, label] of sublabels.entries()) {
		const middleAngle = getMiddleAngle(index, angleStep);

		drawSublabels({
			chartArea,
			context,
			label,
			middleAngle,
			scale,
		});

		drawDots({ chartArea, context, index, meta, middleAngle, scale });
	}
};

export { drawExtraPointGraphics };
