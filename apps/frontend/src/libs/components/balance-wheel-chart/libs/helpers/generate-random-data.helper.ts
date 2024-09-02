import { BALANCE_WHEEL_CHART_DATA_CONFIG } from "../enums/enums.js";

const generateRandomData = (): number[] => {
	return Array.from(
		{ length: BALANCE_WHEEL_CHART_DATA_CONFIG.SEGMENT_COUNT },
		() =>
			Math.floor(
				Math.random() *
					(BALANCE_WHEEL_CHART_DATA_CONFIG.MAXIMUM_DATA_VALUE -
						BALANCE_WHEEL_CHART_DATA_CONFIG.MINIMUM_DATA_VALUE +
						BALANCE_WHEEL_CHART_DATA_CONFIG.RANGE_OFFSET),
			) + BALANCE_WHEEL_CHART_DATA_CONFIG.MINIMUM_DATA_VALUE,
	);
};

export { generateRandomData };
