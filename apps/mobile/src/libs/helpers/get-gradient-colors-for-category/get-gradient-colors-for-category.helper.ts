import { categoryToColors, type colorToGradientColors } from "~/libs/maps/maps";

const DEFAULT_SLIDER_COLOR = "blue";

const getGradientColorsForCategory = (
	categoryName: string,
): keyof typeof colorToGradientColors => {
	return (
		categoryToColors[categoryName.replaceAll(/\s+/g, "")] ??
		DEFAULT_SLIDER_COLOR
	);
};

export { getGradientColorsForCategory };
