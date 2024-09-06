import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { DotOffsetY } from "../../enums/enums.js";
import { type GetGraphicsCoordinateOffset } from "../../types/types.js";

const getDotOffsetY: GetGraphicsCoordinateOffset = (
	graphicsPosition,
	centers,
) => {
	const { x, y } = graphicsPosition;

	const { secondPartCenterX, secondPartCenterY } = centers;

	switch (true) {
		case x > secondPartCenterX: {
			return DotOffsetY.RIGHTMOST;
		}

		case y > secondPartCenterY: {
			return DotOffsetY.BOTTOM_CENTER;
		}

		default: {
			return DEFAULT_GRAPHICS_OFFSET;
		}
	}
};

export { getDotOffsetY };
