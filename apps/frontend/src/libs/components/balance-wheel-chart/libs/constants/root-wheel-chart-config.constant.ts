import { type ChartConfiguration } from "~/libs/types/types.js";

import { ChartGraphicsColor } from "../enums/enums.js";
import {
	drawExtraPointGraphics,
	generateGradientColor,
} from "../helpers/helpers.js";
import { type PolarAreaType } from "../types/types.js";

const ROOT_WHEEL_CHART_CONFIG: ChartConfiguration<PolarAreaType> = {
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
		layout: {
			padding: 89,
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
		},
		scales: {
			r: {
				grid: {
					circular: true,
					color: ChartGraphicsColor.GRID_COLOR,
					lineWidth: 1,
					z: 1,
				},
				max: 10,
				min: 0,
				pointLabels: {
					centerPointLabels: true,
					display: false,
				},
				ticks: {
					display: false,
				},
			},
		},
	},
	plugins: [
		{
			afterDatasetDraw: drawExtraPointGraphics,
			id: "extraPointGraphics",
		},
	],
	type: "polarArea",
} as const;

export { ROOT_WHEEL_CHART_CONFIG };
