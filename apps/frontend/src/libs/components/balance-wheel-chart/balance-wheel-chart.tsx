import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import {
	CATEGORIES_ORDER,
	FIRST_ELEMENT_INDEX,
	NOT_FOUND_INDEX,
	USER_WHEEL_CHART_CONFIG,
} from "./libs/constants/constants.js";
import { type ChartDataType } from "./libs/types/chart-data.type.js";
import {
	type CategorizedData,
	type PolarAreaType,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
};

type CategoryName = (typeof CATEGORIES_ORDER)[number];

const BalanceWheelChart: React.FC<Properties> = ({ data }: Properties) => {
	const chartReference = useRef<ChartJS<
		PolarAreaType,
		CategorizedData[]
	> | null>(null);

	const handleUpdateChartData = useCallback(
		(chartData: ChartDataType[]): void => {
			const chartInstance = chartReference.current;

			if (
				!chartInstance ||
				!chartInstance.data.datasets[FIRST_ELEMENT_INDEX]?.data
			) {
				return;
			}

			const orderedChartData = chartData.sort((a, b) => {
				const indexA = CATEGORIES_ORDER.indexOf(a.categoryName as CategoryName);
				const indexB = CATEGORIES_ORDER.indexOf(b.categoryName as CategoryName);

				const chartDataEnd = CATEGORIES_ORDER.length;

				const adjustedIndexA =
					indexA === NOT_FOUND_INDEX ? chartDataEnd : indexA;
				const adjustedIndexB =
					indexB === NOT_FOUND_INDEX ? chartDataEnd : indexB;

				return adjustedIndexA - adjustedIndexB;
			});

			chartInstance.data.datasets[FIRST_ELEMENT_INDEX].data =
				orderedChartData.map((entry) => {
					return {
						categoryName: entry.categoryName,
						value: entry.data,
					};
				});

			chartInstance.data.labels = chartData.map((entry) => entry.data);

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
				chartReference.current = new ChartJS<PolarAreaType, CategorizedData[]>(
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
