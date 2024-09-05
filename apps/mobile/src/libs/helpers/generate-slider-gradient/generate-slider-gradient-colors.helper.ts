import { colorToGradientColors } from "~/libs/maps/maps";

const DEFAULT_COLOR = "#D9D9D9";
const SEGMENT_PAIR_LENGTH = 2;
const FIRST_COLOR_INDEX = 0;
const SECOND_COLOR_INDEX = 1;

const generateGradientColors = (
	activeSegments: number,
	gradientColor: keyof typeof colorToGradientColors,
	totalSegments: number,
): string[] => {
	const colors = colorToGradientColors[gradientColor];

	const gradientColors: string[] = Array.from(
		{ length: totalSegments * SEGMENT_PAIR_LENGTH },
		() => DEFAULT_COLOR,
	);

	for (let index = 0; index < activeSegments; index++) {
		gradientColors[index * SEGMENT_PAIR_LENGTH] =
			colors[FIRST_COLOR_INDEX] ?? DEFAULT_COLOR;
		gradientColors[index * SEGMENT_PAIR_LENGTH + SECOND_COLOR_INDEX] =
			colors[SECOND_COLOR_INDEX] ?? DEFAULT_COLOR;
	}

	return gradientColors;
};

export { generateGradientColors };
