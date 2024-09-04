import { type ChartArea } from "~/libs/types/types.js";

import {
	getAbsoluteCenter,
	getFirstPartCenter,
	getSecondPartCenter,
} from "./helpers.js";

const getCenters = (
	chartArea: ChartArea,
): {
	absoluteCenterX: number;
	absoluteCenterY: number;
	firstPartCenterX: number;
	firstPartCenterY: number;
	secondPartCenterX: number;
	secondPartCenterY: number;
} => {
	const { bottom, left, right, top } = chartArea;
	const firstPartCenterX = getFirstPartCenter(left, right);
	const absoluteCenterX = getAbsoluteCenter(left, right);
	const secondPartCenterX = getSecondPartCenter(left, right);

	const firstPartCenterY = getFirstPartCenter(top, bottom);
	const absoluteCenterY = getAbsoluteCenter(top, bottom);
	const secondPartCenterY = getSecondPartCenter(top, bottom);

	return {
		absoluteCenterX,
		absoluteCenterY,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterX,
		secondPartCenterY,
	};
};

export { getCenters };
