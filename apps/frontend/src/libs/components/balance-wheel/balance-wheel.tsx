import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import { WHEEL_CHART_CONFIG } from "./libs/configs/configs.js";
import { ANIMATION_INTERVAL } from "./libs/constants/constants.js";
import { generateRandomData } from "./libs/helpers/helpers.js";
import { type ChartDataType } from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
	isAnimating: boolean;
};

const BalanceWheel: React.FC<Properties> = ({
	data,
	isAnimating,
}: Properties) => {
	const chartReference = useRef<ChartJS<"polarArea"> | null>(null);

	const updateChartData = useCallback((): void => {
		const chartInstance = chartReference.current;
		const INDEX = 0;

		if (!chartInstance || !chartInstance.data.datasets[INDEX]?.data) {
			return;
		}

		chartInstance.data.datasets[INDEX].data = data.map((entry) => entry.data);
		chartInstance.data.labels = data.map((entry) => entry.label);

		chartInstance.update();
	}, [data]);

	const animateChartData = useCallback(() => {
		if (!isAnimating) {
			return;
		}

		const chartInstance = chartReference.current;
		const INDEX = 0;

		if (!chartInstance || !chartInstance.data.datasets[INDEX]?.data) {
			return;
		}

		chartInstance.data.datasets[INDEX].data = generateRandomData();
		chartInstance.update();
	}, [isAnimating]);

	useEffect(() => {
		const intervalId = setInterval(animateChartData, ANIMATION_INTERVAL);

		return (): void => {
			clearInterval(intervalId);
		};
	}, [animateChartData]);

	useEffect(() => {
		updateChartData();
	}, [updateChartData]);

	const renderChart = useCallback((canvas?: HTMLCanvasElement | null): void => {
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
	}, []);

	return (
		<div className={styles["container"]}>
			<canvas ref={renderChart} />
		</div>
	);
};

export { BalanceWheel };
