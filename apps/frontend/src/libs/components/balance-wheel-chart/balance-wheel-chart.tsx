import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import {
	ANIMATION_INTERVAL,
	WHEEL_CHART_CONFIG,
} from "./libs/constants/constants.js";
import { generateRandomData } from "./libs/helpers/helpers.js";
import { type ChartDataType } from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
	isAnimating: boolean;
};

const BalanceWheelChart: React.FC<Properties> = ({
	data,
	isAnimating,
}: Properties) => {
	const chartReference = useRef<ChartJS<"polarArea"> | null>(null);

	const handleUpdateChartData = useCallback(
		(chartData: ChartDataType[]): void => {
			const chartInstance = chartReference.current;
			const INDEX = 0;

			if (!chartInstance || !chartInstance.data.datasets[INDEX]?.data) {
				return;
			}

			chartInstance.data.datasets[INDEX].data = chartData.map(
				(entry) => entry.data,
			);
			chartInstance.data.labels = chartData.map((entry) => entry.label);

			chartInstance.update();
		},
		[],
	);

	const handleAnimateChart = useCallback(() => {
		const chartInstance = chartReference.current;
		const INDEX = 0;

		if (!chartInstance || !chartInstance.data.datasets[INDEX]?.data) {
			return;
		}

		chartInstance.data.datasets[INDEX].data = generateRandomData();
		chartInstance.update();
	}, []);

	const handleRenderChart = useCallback(
		(canvas?: HTMLCanvasElement | null): void => {
			if (!canvas) {
				return;
			}

			if (chartReference.current) {
				chartReference.current.destroy();
			}

			const context = canvas.getContext("2d");

			if (context) {
				chartReference.current = new ChartJS<"polarArea">(
					context,
					WHEEL_CHART_CONFIG,
				);
			}
		},
		[],
	);

	useEffect(() => {
		if (isAnimating) {
			const intervalId = setInterval(handleAnimateChart, ANIMATION_INTERVAL);

			return (): void => {
				clearInterval(intervalId);
			};
		}
	}, [handleAnimateChart, isAnimating]);

	useEffect(() => {
		handleUpdateChartData(data);
	}, [data, handleUpdateChartData]);

	return (
		<div className={styles["container"]}>
			<canvas ref={handleRenderChart} />
		</div>
	);
};

export { BalanceWheelChart };
