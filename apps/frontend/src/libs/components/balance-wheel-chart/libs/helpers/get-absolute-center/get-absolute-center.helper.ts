import { AngleCoefficient } from "../../enums/enums.js";

const getAbsoluteCenter = (lowerBound: number, upperBound: number): number => {
	return lowerBound + (upperBound - lowerBound) / AngleCoefficient.HALF;
};

export { getAbsoluteCenter };
