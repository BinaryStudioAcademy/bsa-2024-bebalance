import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { ValueLabelOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getValueLabelOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { y } = graphicsPosition;
	const { absoluteCenterY, firstPartCenterY, secondPartCenterY } = centers;

	switch (true) {
		case y > absoluteCenterY && y < secondPartCenterY: {
			return ValueLabelOffsetY.BOTTOM_CENTER;
		}

		case y > firstPartCenterY && y < absoluteCenterY: {
			return ValueLabelOffsetY.UPPER_CENTER;
		}

		case y > secondPartCenterY: {
			return ValueLabelOffsetY.BOTTOMMOST;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getValueLabelOffsetY };
