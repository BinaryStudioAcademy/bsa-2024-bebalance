import { type ChartConfiguration } from "~/libs/types/types.js";

import { ChartFont, ChartGraphicsColors } from "../enums/enums.js";
import {
	drawExtraPointGraphics,
	generateGradientColor,
	updateLabels,
} from "../helpers/helpers.js";
import { type CategorizedData, type PolarAreaType } from "../types/types.js";

const USER_WHEEL_CHART_CONFIG: ChartConfiguration<
	PolarAreaType,
	CategorizedData[]
> = {
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
		events: [],
		layout: {
			padding: 17,
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
			afterDatasetDraw: drawExtraPointGraphics,
			id: "extraPointGraphics",
		},
		{
			afterDatasetsDraw: updateLabels,
			id: "updateLabels",
		},
	],
	type: "polarArea",
} as const;

export { USER_WHEEL_CHART_CONFIG };
