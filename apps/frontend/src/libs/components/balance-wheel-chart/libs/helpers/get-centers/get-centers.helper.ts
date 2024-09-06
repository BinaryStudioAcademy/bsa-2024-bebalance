import { type ChartArea } from "~/libs/types/types.js";

import { type CentersCoordinates } from "../../types/center-coordinates.type.js";
import { getAbsoluteCenter } from "../get-absolute-center/get-absolute-center.helper.js";
import { getFirstPartCenter } from "../get-first-part-center/get-first-part-center.helper.js";
import { getSecondPartCenter } from "../get-second-part-center/get-second-part-center.helper.js";

const getCenters = (chartArea: ChartArea): CentersCoordinates => {
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
