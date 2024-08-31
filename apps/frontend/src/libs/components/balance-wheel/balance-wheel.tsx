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

import { useEffect, useRef, useState } from "~/libs/hooks/hooks.js";

import {
	generateGradientColor,
	generateRandomData,
} from "./libs/helpers/helpers.js";
import { type ChartDataType } from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[] | null;
	isAnimating: boolean;
};

const CENTER_DIVISOR = 2;
const RADIUS_DIVISOR = 32;
const START_ANGLE = 0;
const END_ANGLE = CENTER_DIVISOR * Math.PI;
const ANIMATION_INTERVAL = 2000;
const DATASET_INDEX = 0;

const options: ChartOptions<"polarArea"> = {
	animation: {
		animateRotate: false,
		easing: "easeInOutQuad",
	},
	scales: {
		r: {
			display: false,
		},
	},
};

const BalanceWheel: React.FC<Properties> = ({
	data,
	isAnimating,
}: Properties) => {
	const [chartData, setChartData] = useState<ChartData<"polarArea">>({
		datasets: [
			{
				backgroundColor: generateGradientColor,
				borderRadius: 5,
				borderWidth: 3,
				data: data ? data.map((entry) => entry.data) : generateRandomData(),
			},
		],
		labels: data ? data.map((entry) => entry.label) : [],
	});
	const chartReference = useRef<ChartJS<"polarArea"> | null>(null);

	const config: ChartConfiguration<"polarArea"> = {
		data: chartData,
		options: {
			...options,
			plugins: {
				tooltip: {
					enabled: !isAnimating,
				},
			},
		},
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
			chartReference.current = new ChartJS<"polarArea">(context, config);
		}
	};

	useEffect(() => {
		if (isAnimating) {
			const intervalId = setInterval(() => {
				setChartData((previousData) => ({
					...previousData,
					datasets: [
						{
							...previousData.datasets[DATASET_INDEX],
							data: generateRandomData(),
						},
					],
				}));
			}, ANIMATION_INTERVAL);

			return (): void => {
				clearInterval(intervalId);
			};
		}
	}, [isAnimating]);

	return (
		<div className={styles["container"]}>
			<canvas ref={renderChart} />
		</div>
	);
};

export { BalanceWheel };
