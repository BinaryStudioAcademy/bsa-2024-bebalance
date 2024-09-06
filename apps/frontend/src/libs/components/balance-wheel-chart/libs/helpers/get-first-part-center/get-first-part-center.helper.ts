import { AngleCoefficient } from "../../enums/enums.js";

const getFirstPartCenter = (start: number, end: number): number => {
	return start + (end - start) / AngleCoefficient.FIFTH;
};

export { getFirstPartCenter };
