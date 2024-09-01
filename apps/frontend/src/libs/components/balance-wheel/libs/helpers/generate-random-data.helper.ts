import { RANDOM_DATA_CONFIG } from "../enums/enums.js";

const generateRandomData = (): number[] => {
	return Array.from(
		{ length: RANDOM_DATA_CONFIG.SEGMENT_COUNT },
		() =>
			Math.floor(
				Math.random() *
					(RANDOM_DATA_CONFIG.MAXIMUM_DATA_VALUE -
						RANDOM_DATA_CONFIG.MINIMUM_DATA_VALUE +
						RANDOM_DATA_CONFIG.RANGE_OFFSET),
			) + RANDOM_DATA_CONFIG.MINIMUM_DATA_VALUE,
	);
};

export { generateRandomData };
