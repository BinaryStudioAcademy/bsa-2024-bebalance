import { AngleCoefficient } from "../../enums/enums.js";

const getFirstPartCenter = (lowerBound: number, upperBound: number): number => {
	return lowerBound + (upperBound - lowerBound) / AngleCoefficient.FIFTH;
};

export { getFirstPartCenter };
