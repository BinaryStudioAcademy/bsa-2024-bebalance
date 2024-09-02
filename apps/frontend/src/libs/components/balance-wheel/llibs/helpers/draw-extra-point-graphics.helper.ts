import { TAU } from "chart.js/helpers";

import { type Chart, type RadialLinearScale } from "~/libs/types/types.js";

import {
	CATEGORIES_SUBLABELS,
	FIRST_ELEMENT_INDEX,
	SINGLE_ELEMENT,
} from "../constants/constants.js";
import { AngleCoefficient } from "../enums/enums.js";
import { type PolarAreaType } from "../types/types.js";
import { drawDots, drawSublabels } from "./helpers.js";

const drawExtraPointGraphics = (
	chart: Chart<PolarAreaType, number[]>,
): void => {
	const { ctx: context } = chart;
	const scale = chart.scales["r"] as RadialLinearScale;
	const meta = chart.getDatasetMeta(FIRST_ELEMENT_INDEX);

	const angleStep = TAU / CATEGORIES_SUBLABELS.length;

	const { _pointLabelItems: pointLabelItems } = meta.rScale as {
		_pointLabelItems: { textAlign: string; x: number; y: number }[];
	} & RadialLinearScale;

	for (const label of pointLabelItems) {
		label.textAlign = "center";
	}

	for (const [index, label] of CATEGORIES_SUBLABELS.entries()) {
		const startAngle = index * angleStep;
		const endAngle = (index + SINGLE_ELEMENT) * angleStep;
		const middleAngle = (startAngle + endAngle) / AngleCoefficient.HALF;

		drawSublabels({ chart, context, label, middleAngle, scale });

		drawDots({ context, index, meta, middleAngle, scale });
	}
};

export { drawExtraPointGraphics };
