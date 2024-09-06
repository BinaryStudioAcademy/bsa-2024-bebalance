import { type ChartArea } from "~/libs/types/types.js";

import {
	type GetGraphicsCoordinateOffset,
	type GraphicsPosition,
} from "../../types/types.js";
import { getCenters } from "../get-centers/get-centers.helper.js";

type GetGraphicsOffset = {
	chartArea: ChartArea;
	getOffsetX: GetGraphicsCoordinateOffset;
	getOffsetY: GetGraphicsCoordinateOffset;
	graphicsPosition: GraphicsPosition;
};

const getGraphicsOffset = ({
	chartArea,
	getOffsetX,
	getOffsetY,
	graphicsPosition,
}: GetGraphicsOffset): { offsetX: number; offsetY: number } => {
	const centers = getCenters(chartArea);

	return {
		offsetX: getOffsetX(graphicsPosition, centers),
		offsetY: getOffsetY(graphicsPosition, centers),
	};
};

export { getGraphicsOffset };
