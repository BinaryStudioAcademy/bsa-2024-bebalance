import { type ChartConfiguration } from "~/libs/types/types.js";

import { ChartFont, ChartGraphicsColors } from "../enums/enums.js";
import {
	drawExtraPointGraphics,
	generateGradientColor,
} from "../helpers/helpers.js";
import { type PolarAreaType } from "../types/types.js";
import { POLAR_AREA } from "./constants.js";

const USER_WHEEL_CHART_CONFIG: ChartConfiguration<PolarAreaType> = {
	data: {
		datasets: [
			{
				backgroundColor: generateGradientColor,
				borderRadius: 5,
				borderWidth: 3,
				data: [],
			},
		],
		labels: [],
	},
	options: {
		animation: false,
		layout: {
			padding: 17,
		},
		plugins: {
			tooltip: { enabled: false },
		},
		scales: {
			r: {
				grid: {
					circular: true,
					color: ChartGraphicsColors.GRID_COLOR,
					lineWidth: 1,
					z: 1,
				},
				pointLabels: {
					centerPointLabels: true,
					color: ChartGraphicsColors.LABELS_COLOR,
					display: true,
					font: {
						family: ChartFont.FAMILY,
						size: ChartFont.LABEL_FONT_SIZE,
						weight: ChartFont.WEIGHT,
					},
					padding: 57,
				},
				ticks: {
					display: false,
				},
			},
		},
	},
	plugins: [
		{
			afterDatasetsDraw: drawExtraPointGraphics,
			id: "extraPointGraphics",
		},
	],
	type: POLAR_AREA,
} as const;

export { USER_WHEEL_CHART_CONFIG };
