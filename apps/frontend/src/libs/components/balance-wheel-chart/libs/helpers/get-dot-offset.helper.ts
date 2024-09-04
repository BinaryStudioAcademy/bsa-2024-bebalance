import { type ChartArea } from "~/libs/types/types.js";

import { DEFAULT_GRAPHICS_OFFSET } from "../constants/constants.js";
import { DotOffsetX, DotOffsetY } from "../enums/enums.js";
import { getCenters } from "./helpers.js";

const getDotOffset = (
	dotPosition: { x: number; y: number },
	chartArea: ChartArea,
): { offsetX: number; offsetY: number } => {
	const {
		absoluteCenterX,
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

				case dotPosition.y > secondPartCenterY &&
					dotPosition.x > absoluteCenterX: {
					return DotOffsetX.RIGHT_LOWER;
				}

				case dotPosition.y > secondPartCenterY &&
					dotPosition.x < absoluteCenterX: {
					return DotOffsetX.LEFT_LOWER;
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

				case dotPosition.y > secondPartCenterY &&
					dotPosition.x > absoluteCenterX: {
					return DotOffsetY.RIGHT_LOWER;
				}

				default: {
					return DEFAULT_GRAPHICS_OFFSET;
				}
			}
		})(),
	};
};

export { getDotOffset };
