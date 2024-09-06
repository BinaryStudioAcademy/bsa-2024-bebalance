import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { SublabelOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getSublabelOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { y } = graphicsPosition;

	const { absoluteCenterY, firstPartCenterY, secondPartCenterY } = centers;

	switch (true) {
		case y > firstPartCenterY && y < absoluteCenterY: {
			return SublabelOffsetY.UPPER_CENTER;
		}

		case y > absoluteCenterY && y < secondPartCenterY: {
			return SublabelOffsetY.BOTTOM_CENTER;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getSublabelOffsetY };
