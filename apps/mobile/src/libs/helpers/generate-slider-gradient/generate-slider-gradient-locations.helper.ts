const SEGMENT_PAIR_LENGTH = 2;
const ADJUSTMENT_FACTOR = 0.99;
const START_INDEX = 0;
const FULL_SEGMENT = 1;

const generateGradientLocations = (segments: number): number[] => {
	return Array.from({ length: segments * SEGMENT_PAIR_LENGTH }, (_, index) => {
		const step = FULL_SEGMENT / segments;
		const positionIndex = Math.floor(index / SEGMENT_PAIR_LENGTH);
		const start = positionIndex * step;

		return index % SEGMENT_PAIR_LENGTH === START_INDEX
			? start
			: start + step * ADJUSTMENT_FACTOR;
	});
};

export { generateGradientLocations };
