import { type Chart, type RadialLinearScale } from "chart.js";
import { TAU } from "chart.js/helpers";

import {
	CATEGORIES_SUBLABELS,
	FIRST_ELEMENT_INDEX,
	SINGLE_ELEMENT,
} from "../constants/constants.js";
import { AngleCoefficient } from "../enums/enums.js";
import { drawDots, drawSublabels } from "../helpers/helpers.js";

const extraPointLabelsPlugin = {
	afterDatasetsDraw: (chart: Chart<"polarArea", number[]>): void => {
		const { ctx: context } = chart;
		const scale = chart.scales["r"] as RadialLinearScale;
		const meta = chart.getDatasetMeta(FIRST_ELEMENT_INDEX);

		const angleStep = TAU / CATEGORIES_SUBLABELS.length;

		for (const [index, label] of CATEGORIES_SUBLABELS.entries()) {
			const startAngle = index * angleStep;
			const endAngle = (index + SINGLE_ELEMENT) * angleStep;
			const middleAngle = (startAngle + endAngle) / AngleCoefficient.HALF;

			drawSublabels({ chart, context, label, middleAngle, scale });

			drawDots({ context, index, meta, middleAngle, scale });
		}
	},
	id: "extraPointLabels",
};

export { extraPointLabelsPlugin };
