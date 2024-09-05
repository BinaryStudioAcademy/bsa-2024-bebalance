import { AngleCoefficient } from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getAbsoluteCenter = (start: number, end: number): number => {
	return start + (end - start) / AngleCoefficient.HALF;
};

export { getAbsoluteCenter };
