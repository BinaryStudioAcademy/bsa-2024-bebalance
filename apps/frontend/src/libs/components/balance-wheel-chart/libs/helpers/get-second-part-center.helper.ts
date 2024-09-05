import { AngleCoefficient } from "../enums/enums.js";

const getSecondPartCenter = (start: number, end: number): number => {
	return end - (end - start) / AngleCoefficient.FIFTH_PART;
};

export { getSecondPartCenter };
