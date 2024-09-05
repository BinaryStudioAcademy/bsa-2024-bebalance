import { type ChartConfiguration } from "~/libs/types/types.js";

import { ChartGraphicsColors } from "../enums/enums.js";
import {
	drawExtraPointGraphics,
	generateGradientColor,
} from "../helpers/helpers.js";
import { type PolarAreaType } from "../types/types.js";

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
		layout: {
			padding: 89,
		},
		parsing: {
			key: "value",
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
					color: ChartGraphicsColors.GRID_COLOR,
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

export { USER_WHEEL_CHART_CONFIG };
