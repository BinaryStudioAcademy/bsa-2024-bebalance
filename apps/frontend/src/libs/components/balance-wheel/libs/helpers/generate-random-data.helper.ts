import { DATA_CONFIG } from "../enums/enums.js";

const generateRandomData = (): number[] => {
	return Array.from(
		{ length: DATA_CONFIG.SEGMENT_COUNT },
		() =>
			Math.floor(
				Math.random() *
					(DATA_CONFIG.MAXIMUM_DATA_VALUE -
						DATA_CONFIG.MINIMUM_DATA_VALUE +
						DATA_CONFIG.RANGE_OFFSET),
			) + DATA_CONFIG.MINIMUM_DATA_VALUE,
	);
};

export { generateRandomData };
