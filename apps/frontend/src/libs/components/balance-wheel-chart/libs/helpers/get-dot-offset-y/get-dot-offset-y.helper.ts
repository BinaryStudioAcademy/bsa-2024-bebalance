import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { DotOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getDotOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x, y } = graphicsPosition;

	const { secondPartCenterX, secondPartCenterY } = centers;

	if (x > secondPartCenterX) {
		return DotOffsetY.RIGHTMOST;
	}

	if (y > secondPartCenterY) {
		return DotOffsetY.BOTTOM_CENTER;
	}

	return DEFAULT_GRAPHICS_OFFSET;
};

export { getDotOffsetY };
