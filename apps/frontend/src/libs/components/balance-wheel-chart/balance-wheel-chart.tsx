import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import {
	ANIMATION_INTERVAL,
	CATEGORIES_ORDER,
	NOT_FOUND_INDEX,
	ROOT_WHEEL_CHART_CONFIG,
	WHEEL_CHART_CONFIG,
} from "./libs/constants/constants.js";
import { generateRandomData } from "./libs/helpers/helpers.js";
import {
	type CategoryName,
	type ChartDataType,
	type PolarAreaType,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
	isAnimating?: boolean;
};

const BalanceWheelChart: React.FC<Properties> = ({
	data,
	isAnimating = false,
}: Properties) => {
	const chartReference = useRef<ChartJS<PolarAreaType> | null>(null);

	const handleUpdateChartData = useCallback(
		(chartData: ChartDataType[]): void => {
			const chartInstance = chartReference.current;

			if (!chartInstance || !chartInstance.data.datasets[ZERO_INDEX]?.data) {
				return;
			}

			const orderedChartData = chartData.sort((a, b) => {
				const indexA = CATEGORIES_ORDER.indexOf(a.label as CategoryName);
				const indexB = CATEGORIES_ORDER.indexOf(b.label as CategoryName);

				const chartDataEnd = CATEGORIES_ORDER.length;

				const boundIndexA = indexA === NOT_FOUND_INDEX ? chartDataEnd : indexA;
				const boundIndexB = indexB === NOT_FOUND_INDEX ? chartDataEnd : indexB;

				return boundIndexA - boundIndexB;
			});

			chartInstance.data.datasets[ZERO_INDEX].data = orderedChartData.map(
				(entry) => {
					return entry.data;
				},
			);

			chartInstance.data.labels = chartData.map((entry) => entry.label);

			chartInstance.update();
		},
		[],
	);

	const handleAnimateChart = useCallback(() => {
		const chartInstance = chartReference.current;

		if (!chartInstance?.data.datasets[ZERO_INDEX]?.data) {
			return;
		}

		chartInstance.data.datasets[ZERO_INDEX].data = generateRandomData();
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
				const chartConfig = isAnimating
					? WHEEL_CHART_CONFIG
					: ROOT_WHEEL_CHART_CONFIG;
				chartReference.current = new ChartJS<PolarAreaType>(
					context,
					chartConfig,
				);
			}
		},
		[isAnimating],
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
		<div
			className={
				isAnimating
					? styles["animation-container"]
					: styles["root-wheel-container"]
			}
		>
			<canvas ref={handleRenderChart} />
		</div>
	);
};

export { BalanceWheelChart };
