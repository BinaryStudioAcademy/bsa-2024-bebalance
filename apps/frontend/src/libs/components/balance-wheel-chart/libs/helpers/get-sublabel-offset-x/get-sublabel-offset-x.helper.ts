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

	switch (true) {
		case x > absoluteCenterX && y < firstPartCenterY: {
			return SublabelOffsetX.UPPER_CENTER_RIGHT;
		}

		case x < firstPartCenterX: {
			return SublabelOffsetX.LEFTMOST;
		}

		case x > absoluteCenterX && x < secondPartCenterX: {
			return SublabelOffsetX.RIGHT_CENTER;
		}

		case y > secondPartCenterY && x < absoluteCenterX: {
			return SublabelOffsetX.LEFT_CENTER;
		}

		case y > absoluteCenterY && x > secondPartCenterX: {
			return SublabelOffsetX.RIGHT_BOTTOM;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getSublabelOffsetX };
