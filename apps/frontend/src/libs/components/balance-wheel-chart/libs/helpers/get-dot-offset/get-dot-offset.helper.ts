import { type ChartArea } from "~/libs/types/types.js";

import { DEFAULT_GRAPHICS_OFFSET } from "../../constants/constants.js";
import { DotOffsetX, DotOffsetY } from "../../enums/enums.js";
import { getCenters } from "../get-centers/get-centers.helper.js";

const getDotOffset = (
	dotPosition: { x: number; y: number },
	chartArea: ChartArea,
): { offsetX: number; offsetY: number } => {
	const {
		absoluteCenterX,
		firstPartCenterX,
		firstPartCenterY,
		secondPartCenterX,
		secondPartCenterY,
	} = getCenters(chartArea);

	return {
		offsetX: ((): number => {
			switch (true) {
				case dotPosition.x > secondPartCenterX: {
					return DotOffsetX.RIGHTMOST;
				}

				case dotPosition.y < firstPartCenterY &&
					dotPosition.x > absoluteCenterX: {
					return DotOffsetX.LEFT_UPPER;
				}

				case dotPosition.y < firstPartCenterY: {
					return DotOffsetX.UPPER_CENTER;
				}

				case dotPosition.y > secondPartCenterY &&
					dotPosition.x < absoluteCenterX: {
					return DotOffsetX.LEFT_BOTTOM;
				}

				case dotPosition.x < firstPartCenterX: {
					return DotOffsetX.LEFTMOST;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
		offsetY: ((): number => {
			switch (true) {
				case dotPosition.x > secondPartCenterX: {
					return DotOffsetY.RIGHTMOST;
				}

				case dotPosition.y > secondPartCenterY: {
					return DotOffsetY.BOTTOM_CENTER;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
	};
};

export { getDotOffset };
