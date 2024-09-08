import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { DotOffsetX } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getDotOffsetX: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x, y } = graphicsPosition;

	const {
		absoluteCenterX,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterX,
		secondPartCenterY,
	} = centers;

	if (x > secondPartCenterX) {
		return DotOffsetX.RIGHTMOST;
	}

	if (y < firstPartCenterY && x > absoluteCenterX) {
		return DotOffsetX.LEFT_UPPER;
	}

	if (y < firstPartCenterY) {
		return DotOffsetX.UPPER_CENTER;
	}

	if (y > secondPartCenterY && x < absoluteCenterX) {
		return DotOffsetX.LEFT_BOTTOM;
	}

	if (x < firstPartCenterX) {
		return DotOffsetX.LEFTMOST;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getDotOffsetX };
