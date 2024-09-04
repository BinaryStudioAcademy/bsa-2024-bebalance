import { AngleCoefficient } from "../enums/enums.js";

const getAbsoluteCenter = (start: number, end: number): number => {
	return start + (end - start) / AngleCoefficient.HALF;
};

export { getAbsoluteCenter };
