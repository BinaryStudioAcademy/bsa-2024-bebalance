import { type ChartArea } from "~/libs/types/types.js";

import { DEFAULT_GRAPHICS_OFFSET } from "../constants/constants.js";
import { getCenters } from "./helpers.js";

const LabelOffsetX = {
	BOTTOM_RIGHT: -28,
	LEFT_CENTER: 14,
	LEFTMOST: 5,
	RIGHTMOST: -16,
	UPPER_RIGHT: -10,
} as const;

const LabelOffsetY = {
	BOTTOM_CENTER: -42,
	BOTTOMMOST: 6,
	TOP_CENTER: -12,
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

				case labelPosition.x > firstPartCenterX &&
					labelPosition.x < absoluteCenterX: {
					return LabelOffsetX.LEFT_CENTER;
				}

				case labelPosition.x > secondPartCenterY: {
					return LabelOffsetX.RIGHTMOST;
				}

				case labelPosition.y > secondPartCenterY &&
					labelPosition.x > absoluteCenterX: {
					return LabelOffsetX.BOTTOM_RIGHT;
				}

				case labelPosition.y < firstPartCenterY &&
					labelPosition.x > absoluteCenterX: {
					return LabelOffsetX.UPPER_RIGHT;
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
