const DEFAULT_MIN_VALUE = 0;
const CORRECTION_VALUE = 1;

const getRandomValue = ({
	max,
	min = DEFAULT_MIN_VALUE,
}: {
	max: number;
	min?: number;
}): number => {
	return Math.floor(Math.random() * (max + CORRECTION_VALUE - min)) + min;
};

export { getRandomValue };
