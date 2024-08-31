const ARC_COUNT = 7;
const MINIMUM_DATA_VALUE = 5;
const MAXIMUM_DATA_VALUE = 10;
const RANGE_OFFSET = 1;

const generateRandomData = (): number[] => {
	return Array.from(
		{ length: ARC_COUNT },
		() =>
			Math.floor(
				Math.random() *
					(MAXIMUM_DATA_VALUE - MINIMUM_DATA_VALUE + RANGE_OFFSET),
			) + MINIMUM_DATA_VALUE,
	);
};

export { generateRandomData };
