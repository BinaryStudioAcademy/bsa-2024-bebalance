import {
	ArcElement,
	Chart as ChartJS,
	PolarAreaController,
	RadialLinearScale,
	Tooltip,
} from "chart.js";

import { useCallback, useEffect, useRef } from "~/libs/hooks/hooks.js";

import { USER_WHEEL_CHART_CONFIG } from "./llibs/configs/configs.js";
import { FIRST_ELEMENT_INDEX } from "./llibs/constants/constants.js";
import { type ChartDataType, type PolarAreaType } from "./llibs/types/types.js";
import styles from "./styles.module.css";

ChartJS.register(PolarAreaController, ArcElement, Tooltip, RadialLinearScale);

type Properties = {
	data: ChartDataType[];
};

const BalanceWheel: React.FC<Properties> = ({ data }: Properties) => {
	const chartReference = useRef<ChartJS<PolarAreaType> | null>(null);

	const updateChartData = useCallback((): void => {
		const chartInstance = chartReference.current;

		if (
			!chartInstance ||
			!chartInstance.data.datasets[FIRST_ELEMENT_INDEX]?.data
		) {
			return;
		}

		chartInstance.data.datasets[FIRST_ELEMENT_INDEX].data = data.map(
			(entry) => entry.data,
		);
		chartInstance.data.labels = data.map((entry) => entry.label);

		chartInstance.update();
	}, [data]);

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
			chartReference.current = new ChartJS<PolarAreaType>(
				context,
				USER_WHEEL_CHART_CONFIG,
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
