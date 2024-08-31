import {
	ArcElement,
	type ChartConfiguration,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useRef } from "~/libs/hooks/hooks.js";

import { generateGradientColor } from "./libs/helpers/helpers.js";
import { type ChartDataType } from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
};

const CENTER_DIVISOR = 2;
const RADIUS_DIVISOR = 32;
const START_ANGLE = 0;
const END_ANGLE = CENTER_DIVISOR * Math.PI;

const options: ChartOptions<"polarArea"> = {
	scales: {
		r: {
			display: false,
		},
	},
};

const BalanceWheel: React.FC<Properties> = ({ data }: Properties) => {
	const chartReference = useRef<ChartJS<"polarArea"> | null>(null);

	const mapLabels = data.map((entry) => entry.label);
	const mapData = data.map((entry) => entry.data);

	const chartData: ChartData<"polarArea"> = {
		datasets: [
			{
				backgroundColor: generateGradientColor,
				borderRadius: 10,
				borderWidth: 5,
				data: mapData,
			},
		],
		labels: mapLabels,
	};

	const config: ChartConfiguration<"polarArea"> = {
		data: chartData,
		options,
		plugins: [
			{
				afterDraw: (chart): void => {
					const { chartArea, ctx } = chart;
					const centerX = (chartArea.left + chartArea.right) / CENTER_DIVISOR;
					const centerY = (chartArea.top + chartArea.bottom) / CENTER_DIVISOR;
					const radius =
						Math.min(
							chartArea.right - chartArea.left,
							chartArea.bottom - chartArea.top,
						) / RADIUS_DIVISOR;

					ctx.save();
					ctx.beginPath();
					ctx.arc(centerX, centerY, radius, START_ANGLE, END_ANGLE);
					ctx.fillStyle = "white";
					ctx.fill();
					ctx.restore();
				},
				id: "centerCircle",
			},
		],
		type: "polarArea",
	};

	const renderChart = (canvas: HTMLCanvasElement | null): void => {
		if (!canvas) {
			return;
		}

		if (chartReference.current) {
			chartReference.current.destroy();
		}

		const context = canvas.getContext("2d");

		if (context) {
			chartReference.current = new ChartJS<"polarArea">(context, { ...config });
		}
	};

	return (
		<div className={styles["container"]}>
			<canvas ref={renderChart} />
		</div>
	);
};

export { BalanceWheel };
