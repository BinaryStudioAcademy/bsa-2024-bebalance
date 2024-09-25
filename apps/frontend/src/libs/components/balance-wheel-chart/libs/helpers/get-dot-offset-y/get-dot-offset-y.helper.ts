import {
	DEFAULT_GRAPHICS_OFFSET,
	RIGHTMOST_DOTS_OFFSET_Y,
} from "../../constants/constants.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getDotOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x } = graphicsPosition;

	const { secondPartCenterX } = centers;

	if (x > secondPartCenterX) {
		return RIGHTMOST_DOTS_OFFSET_Y;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getDotOffsetY };
