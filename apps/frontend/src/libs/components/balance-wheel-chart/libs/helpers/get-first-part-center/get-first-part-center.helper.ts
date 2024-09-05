import { AngleCoefficient } from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getFirstPartCenter = (start: number, end: number): number => {
	return start + (end - start) / AngleCoefficient.FIFTH_PART;
};

export { getFirstPartCenter };
