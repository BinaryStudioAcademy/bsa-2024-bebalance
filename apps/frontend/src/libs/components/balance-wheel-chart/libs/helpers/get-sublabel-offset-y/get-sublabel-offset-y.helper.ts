import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { SublabelOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getSublabelOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { y } = graphicsPosition;

	const { absoluteCenterY, firstPartCenterY, secondPartCenterY } = centers;

	if (y > firstPartCenterY && y < absoluteCenterY) {
		return SublabelOffsetY.UPPER_CENTER;
	}

	if (y > absoluteCenterY && y < secondPartCenterY) {
		return SublabelOffsetY.BOTTOM_CENTER;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getSublabelOffsetY };
