import { AngleCoefficient } from "../../enums/enums.js";

const getSecondPartCenter = (
	lowerBound: number,
	upperBound: number,
): number => {
	return upperBound - (upperBound - lowerBound) / AngleCoefficient.FIFTH;
};

export { getSecondPartCenter };
