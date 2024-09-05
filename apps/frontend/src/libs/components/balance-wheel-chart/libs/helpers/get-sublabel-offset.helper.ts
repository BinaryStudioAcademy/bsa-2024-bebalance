import { type ChartArea } from "~/libs/types/types.js";

import { DEFAULT_GRAPHICS_OFFSET } from "../constants/constants.js";
import { SublabelOffsetX, SublabelOffsetY } from "../enums/enums.js";
import { getCenters } from "./helpers.js";

const getSublabelOffset = (
	sublabelPosition: { x: number; y: number },
	chartArea: ChartArea,
): { offsetX: number; offsetY: number } => {
	const {
		absoluteCenterX,
		absoluteCenterY,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterX,
		secondPartCenterY,
	} = getCenters(chartArea);

	return {
		offsetX: ((): number => {
			switch (true) {
				case sublabelPosition.x < firstPartCenterX: {
					return SublabelOffsetX.LEFTMOST;
				}

				case sublabelPosition.x > absoluteCenterX &&
					sublabelPosition.x < secondPartCenterX: {
					return SublabelOffsetX.RIGHT_CENTER;
				}

				case sublabelPosition.y > secondPartCenterY &&
					sublabelPosition.x < absoluteCenterX: {
					return SublabelOffsetX.LEFT_CENTER;
				}

				case sublabelPosition.y > absoluteCenterY &&
					sublabelPosition.x > secondPartCenterX: {
					return SublabelOffsetX.BOTTOM_RIGHT;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
		offsetY: ((): number => {
			switch (true) {
				case sublabelPosition.y > firstPartCenterY &&
					sublabelPosition.y < absoluteCenterY: {
					return SublabelOffsetY.UPPER_CENTER;
				}

				case sublabelPosition.y > absoluteCenterY &&
					sublabelPosition.y < secondPartCenterY: {
					return SublabelOffsetY.BOTTOM_CENTER;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
	};
};

export { getSublabelOffset };
