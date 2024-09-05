import { SINGLE_ELEMENT } from "~/libs/components/balance-wheel-chart/libs/constants/constants.js";
import { AngleCoefficient } from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";

const getMiddleAngle = (index: number, angleStep: number): number => {
	const startAngle = index * angleStep;
	const endAngle = (index + SINGLE_ELEMENT) * angleStep;

	return (startAngle + endAngle) / AngleCoefficient.HALF;
};

export { getMiddleAngle };
