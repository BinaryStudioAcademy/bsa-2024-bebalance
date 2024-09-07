import { BalanceWheelChartDataConfig } from "../../enums/enums.js";

const generateRandomData = (): number[] => {
	return Array.from(
		{ length: BalanceWheelChartDataConfig.SEGMENT_COUNT },
		() =>
			Math.floor(
				Math.random() *
					(BalanceWheelChartDataConfig.MAXIMUM_DATA_VALUE -
						BalanceWheelChartDataConfig.MINIMUM_DATA_VALUE +
						BalanceWheelChartDataConfig.RANGE_OFFSET),
			) + BalanceWheelChartDataConfig.MINIMUM_DATA_VALUE,
	);
};

export { generateRandomData };
