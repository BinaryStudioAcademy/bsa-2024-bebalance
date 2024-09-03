import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import {
	CATEGORIES_SUBLABELS,
	FIRST_ELEMENT_INDEX,
	USER_WHEEL_CHART_CONFIG,
} from "./libs/constants/constants.js";
import { type ChartDataType, type PolarAreaType } from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
};

type CategoryName = (typeof CATEGORIES_SUBLABELS)[number];

const BalanceWheelChart: React.FC<Properties> = ({ data }: Properties) => {
	const chartReference = useRef<ChartJS<PolarAreaType> | null>(null);

	const handleUpdateChartData = useCallback(
		(chartData: ChartDataType[]): void => {
			const chartInstance = chartReference.current;

			if (
				!chartInstance ||
				!chartInstance.data.datasets[FIRST_ELEMENT_INDEX]?.data
			) {
				return;
			}

			const sortedChartData = chartData.sort(
				(a, b) =>
					CATEGORIES_SUBLABELS.indexOf(a.categoryName as CategoryName) -
					CATEGORIES_SUBLABELS.indexOf(b.categoryName as CategoryName),
			);

			chartInstance.data.datasets[FIRST_ELEMENT_INDEX].data =
				sortedChartData.map((entry) => entry.data);
			chartInstance.data.labels = sortedChartData.map((entry) => entry.label);

			chartInstance.update();
		},
		[],
	);

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
				chartReference.current = new ChartJS<PolarAreaType>(
					context,
					USER_WHEEL_CHART_CONFIG,
				);
			}
		},
		[],
	);

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
