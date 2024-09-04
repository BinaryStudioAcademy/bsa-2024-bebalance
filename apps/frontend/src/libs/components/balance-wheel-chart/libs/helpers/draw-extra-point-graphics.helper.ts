import { TAU } from "~/libs/constants/constants.js";
import { type Chart, type RadialLinearScale } from "~/libs/types/types.js";

import { FIRST_ELEMENT_INDEX, SINGLE_ELEMENT } from "../constants/constants.js";
import { AngleCoefficient } from "../enums/enums.js";
import { type PolarAreaType } from "../types/types.js";
import { drawDots, drawSublabels } from "./helpers.js";

const drawExtraPointGraphics = (chart: Chart<PolarAreaType>): void => {
	const { ctx: context } = chart;
	const scale = chart.scales["r"] as RadialLinearScale;
	const meta = chart.getDatasetMeta(FIRST_ELEMENT_INDEX);
	const { chartArea } = chart;

	const sublabels = chart.data.labels as string[];

	const angleStep = TAU / sublabels.length;

	for (const [index, label] of sublabels.entries()) {
		const startAngle = index * angleStep;
		const endAngle = (index + SINGLE_ELEMENT) * angleStep;
		const middleAngle = (startAngle + endAngle) / AngleCoefficient.HALF;

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
