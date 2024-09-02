import { AngleCoefficient } from "../enums/angle-coefficient.enum.js";

const getAlignment = (
	x: number,
	chartArea: { left: number; right: number },
): CanvasTextAlign => {
	const centerLeft =
		chartArea.left +
		(chartArea.right - chartArea.left) / AngleCoefficient.QUARTER;
	const centerRight =
		chartArea.right -
		(chartArea.right - chartArea.left) / AngleCoefficient.QUARTER;

	if (x > centerLeft && x < centerRight) {
		return "center";
	} else if (x > chartArea.right / AngleCoefficient.HALF) {
		return "right";
	}

	return "center";
};

export { getAlignment };
