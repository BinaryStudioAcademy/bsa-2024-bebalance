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

	switch (true) {
		case x < firstPartCenterX: {
			return ValueLabelOffsetX.LEFTMOST;
		}

		case x > firstPartCenterX && x < absoluteCenterX: {
			return ValueLabelOffsetX.LEFT_CENTER;
		}

		case x > secondPartCenterY: {
			return ValueLabelOffsetX.RIGHTMOST;
		}

		case y > secondPartCenterY && x > absoluteCenterX: {
			return ValueLabelOffsetX.RIGHT_BOTTOM;
		}

		case y < firstPartCenterY && x > absoluteCenterX: {
			return ValueLabelOffsetX.RIGHT_UPPER;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getValueLabelOffsetX };
