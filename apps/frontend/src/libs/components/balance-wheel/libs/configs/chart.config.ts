import { type ChartConfiguration } from "~/libs/types/types.js";

import {
	generateGradientColor,
	generateRandomData,
} from "../helpers/helpers.js";

const WHEEL_CHART_CONFIG: ChartConfiguration<"polarArea"> = {
	data: {
		datasets: [
			{
				backgroundColor: generateGradientColor,
				borderRadius: 5,
				borderWidth: 3,
				data: generateRandomData(),
			},
		],
		labels: [],
	},
	options: {
		animation: {
			easing: "easeInOutQuad",
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
		},
		scales: {
			r: {
				display: false,
			},
		},
	},
	type: "polarArea",
};

export { WHEEL_CHART_CONFIG };
