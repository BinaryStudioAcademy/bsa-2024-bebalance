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

	switch (true) {
		case x > secondPartCenterX: {
			return DotOffsetX.RIGHTMOST;
		}

		case y < firstPartCenterY && x > absoluteCenterX: {
			return DotOffsetX.LEFT_UPPER;
		}

		case y < firstPartCenterY: {
			return DotOffsetX.UPPER_CENTER;
		}

		case y > secondPartCenterY && x < absoluteCenterX: {
			return DotOffsetX.LEFT_BOTTOM;
		}

		case x < firstPartCenterX: {
			return DotOffsetX.LEFTMOST;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getDotOffsetX };
