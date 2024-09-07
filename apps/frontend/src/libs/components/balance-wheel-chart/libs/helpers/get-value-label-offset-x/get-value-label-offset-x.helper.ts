import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { ValueLabelOffsetX } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getValueLabelOffsetX: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x, y } = graphicsPosition;

	const {
		absoluteCenterX,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterY,
	} = centers;

	if (x < firstPartCenterX) {
		return ValueLabelOffsetX.LEFTMOST;
	}

	if (x > firstPartCenterX && x < absoluteCenterX) {
		return ValueLabelOffsetX.LEFT_CENTER;
	}

	if (x > secondPartCenterY) {
		return ValueLabelOffsetX.RIGHTMOST;
	}

	if (y > secondPartCenterY && x > absoluteCenterX) {
		return ValueLabelOffsetX.RIGHT_BOTTOM;
	}

	if (y < firstPartCenterY && x > absoluteCenterX) {
		return ValueLabelOffsetX.RIGHT_UPPER;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getValueLabelOffsetX };
