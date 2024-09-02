import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import {
	FIRST_ELEMENT_INDEX,
	USER_WHEEL_CHART_CONFIG,
} from "./llibs/constants/constants.js";
import { type ChartDataType, type PolarAreaType } from "./llibs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
};

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

			chartInstance.data.datasets[FIRST_ELEMENT_INDEX].data = chartData.map(
				(entry) => entry.data,
			);
			chartInstance.data.labels = chartData.map((entry) => entry.label);

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
				chartReference.current = new ChartJS<"polarArea">(
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
