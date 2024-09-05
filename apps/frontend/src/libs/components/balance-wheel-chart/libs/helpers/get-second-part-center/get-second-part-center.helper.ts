import { AngleCoefficient } from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getSecondPartCenter = (start: number, end: number): number => {
	return end - (end - start) / AngleCoefficient.FIFTH_PART;
};

export { getSecondPartCenter };
