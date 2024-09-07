import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { SublabelOffsetX } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getSublabelOffsetX: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x, y } = graphicsPosition;

	const {
		absoluteCenterX,
		absoluteCenterY,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterX,
		secondPartCenterY,
	} = centers;

	if (x > absoluteCenterX && y < firstPartCenterY) {
		return SublabelOffsetX.UPPER_CENTER_RIGHT;
	}

	if (x < firstPartCenterX) {
		return SublabelOffsetX.LEFTMOST;
	}

	if (x > absoluteCenterX && x < secondPartCenterX) {
		return SublabelOffsetX.RIGHT_CENTER;
	}

	if (y > secondPartCenterY && x < absoluteCenterX) {
		return SublabelOffsetX.LEFT_CENTER;
	}

	if (y > absoluteCenterY && x > secondPartCenterX) {
		return SublabelOffsetX.RIGHT_BOTTOM;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getSublabelOffsetX };
