import { DEFAULT_GRAPHICS_OFFSET } from "~/libs/components/balance-wheel-chart/libs/constants/constants.js";
import {
	ValueLabelOffsetX,
	ValueLabelOffsetY,
} from "~/libs/components/balance-wheel-chart/libs/enums/enums.js";
import { type ChartArea } from "~/libs/types/types.js";

import { getCenters } from "../get-centers/get-centers.helper.js";

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
					return ValueLabelOffsetX.LEFTMOST;
				}

				case labelPosition.x > firstPartCenterX &&
					labelPosition.x < absoluteCenterX: {
					return ValueLabelOffsetX.LEFT_CENTER;
				}

				case labelPosition.x > secondPartCenterY: {
					return ValueLabelOffsetX.RIGHTMOST;
				}

				case labelPosition.y > secondPartCenterY &&
					labelPosition.x > absoluteCenterX: {
					return ValueLabelOffsetX.RIGHT_BOTTOM;
				}

				case labelPosition.y < firstPartCenterY &&
					labelPosition.x > absoluteCenterX: {
					return ValueLabelOffsetX.RIGHT_UPPER;
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
					return ValueLabelOffsetY.BOTTOM_CENTER;
				}

				case labelPosition.y > firstPartCenterY &&
					labelPosition.y < absoluteCenterY: {
					return ValueLabelOffsetY.UPPER_CENTER;
				}

				case labelPosition.y > secondPartCenterY: {
					return ValueLabelOffsetY.BOTTOMMOST;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
	};
};

export { getLabelOffset };
