import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { ValueLabelOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getValueLabelOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { y } = graphicsPosition;
	const { absoluteCenterY, firstPartCenterY, secondPartCenterY } = centers;

	if (y > absoluteCenterY && y < secondPartCenterY) {
		return ValueLabelOffsetY.BOTTOM_CENTER;
	}

	if (y > firstPartCenterY && y < absoluteCenterY) {
		return ValueLabelOffsetY.UPPER_CENTER;
	}

	if (y > secondPartCenterY) {
		return ValueLabelOffsetY.BOTTOMMOST;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getValueLabelOffsetY };
