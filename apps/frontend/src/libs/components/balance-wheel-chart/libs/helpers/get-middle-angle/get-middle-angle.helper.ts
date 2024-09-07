import { SINGLE_ELEMENT } from "../../constants/constants.js";
import { AngleCoefficient } from "../../enums/enums.js";

const getMiddleAngle = (index: number, angleStep: number): number => {
	const startAngle = index * angleStep;
	const endAngle = (index + SINGLE_ELEMENT) * angleStep;

	return (startAngle + endAngle) / AngleCoefficient.HALF;
};

export { getMiddleAngle };
