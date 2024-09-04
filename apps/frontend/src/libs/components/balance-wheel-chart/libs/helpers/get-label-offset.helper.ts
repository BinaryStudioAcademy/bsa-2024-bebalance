import { type ChartArea } from "~/libs/types/types.js";

import { DEFAULT_GRAPHICS_OFFSET } from "../constants/constants.js";
import { getCenters } from "./helpers.js";

const LabelOffsetX = {
	BOTTOM_RIGHT: -25,
	LEFTMOST: -14,
} as const;

const LabelOffsetY = {
	BOTTOM_CENTER: -58,
	BOTTOMMOST: 5,
	TOP_CENTER: 2,
} as const;

const getLabelOffset = (
	labelPosition: { x: number; y: number },
	chartArea: ChartArea,
): { offsetX: number; offsetY: number } => {
	const {
		absoluteCenterX,
		absoluteCenterY,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterY,
	} = getCenters(chartArea);

	return {
		offsetX: ((): number => {
			switch (true) {
				case labelPosition.x < firstPartCenterX: {
					return LabelOffsetX.LEFTMOST;
				}

				case labelPosition.y > secondPartCenterY &&
					labelPosition.x > absoluteCenterX: {
					return LabelOffsetX.BOTTOM_RIGHT;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
		offsetY: ((): number => {
			switch (true) {
				case labelPosition.y > absoluteCenterY &&
					labelPosition.y < secondPartCenterY: {
					return LabelOffsetY.BOTTOM_CENTER;
				}

				case labelPosition.y > firstPartCenterY &&
					labelPosition.y < absoluteCenterY: {
					return LabelOffsetY.TOP_CENTER;
				}

				case labelPosition.y > secondPartCenterY: {
					return LabelOffsetY.BOTTOMMOST;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
	};
};

export { getLabelOffset };
