import { type ChartConfiguration } from "chart.js";

import { CHART_CONFIG } from "../enums/enums.js";
import {
	generateGradientColor,
	generateRandomData,
} from "../helpers/helpers.js";

const chartConfig: ChartConfiguration<"polarArea"> = {
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
		scales: {
			r: {
				display: false,
			},
		},
	},
	plugins: [
		{
			afterDraw: (chart): void => {
				const { chartArea, ctx } = chart;
				const centerX =
					(chartArea.left + chartArea.right) / CHART_CONFIG.CENTER_DIVISOR;
				const centerY =
					(chartArea.top + chartArea.bottom) / CHART_CONFIG.CENTER_DIVISOR;
				const radius =
					Math.min(
						chartArea.right - chartArea.left,
						chartArea.bottom - chartArea.top,
					) / CHART_CONFIG.RADIUS_DIVISOR;

				ctx.save();
				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					radius,
					CHART_CONFIG.START_ANGLE,
					CHART_CONFIG.END_ANGLE,
				);
				ctx.fillStyle = "white";
				ctx.fill();
				ctx.restore();
			},
			id: "centerCircle",
		},
	],
	type: "polarArea",
};

export { chartConfig };
