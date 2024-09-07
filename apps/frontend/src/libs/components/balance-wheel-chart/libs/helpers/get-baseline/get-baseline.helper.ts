import { AngleCoefficient } from "../../enums/enums.js";

const getBaseline = (
	y: number,
	chartArea: { bottom: number; top: number },
): CanvasTextBaseline => {
	const centerTop =
		chartArea.top + (chartArea.bottom - chartArea.top) / AngleCoefficient.FIFTH;
	const centerBottom =
		chartArea.bottom -
		(chartArea.bottom - chartArea.top) / AngleCoefficient.FIFTH;

	if (y > centerTop && y < centerBottom) {
		return "middle";
	} else if (y > chartArea.bottom / AngleCoefficient.HALF) {
		return "top";
	}

	return "bottom";
};

export { getBaseline };
