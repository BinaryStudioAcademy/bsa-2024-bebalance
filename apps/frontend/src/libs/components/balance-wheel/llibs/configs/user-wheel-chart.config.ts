import { type ChartConfiguration } from "chart.js";

import { POLAR_AREA } from "../constants/constants.js";
import { generateGradientColor } from "../helpers/helpers.js";
import { extraPointLabelsPlugin } from "../plugins/plugins.js";
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
		animation: false,
		layout: {
			padding: 50,
		},
		plugins: {
			tooltip: { enabled: false },
		},
		scales: {
			r: {
				grid: {
					circular: true,
					color: "#0084ff11",
					lineWidth: 1,
					z: 1,
				},
				pointLabels: {
					centerPointLabels: true,
					display: true,
					font: {
						size: 18,
					},
					padding: 40,
				},
				ticks: {
					display: false,
				},
			},
		},
	},
	plugins: [extraPointLabelsPlugin],
	type: POLAR_AREA,
};

export { USER_WHEEL_CHART_CONFIG };
