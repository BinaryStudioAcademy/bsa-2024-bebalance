import { GradientColor } from "~/libs/enums/enums";
import { categoryToGradientColors } from "~/libs/maps/maps";
import { type ValueOf } from "~/libs/types/types";

const DEFAULT_COLORS = GradientColor.BLUE;

const transformCategoryToGradientColors = (
	categoryName: string,
): ValueOf<typeof GradientColor> => {
	return (
		categoryToGradientColors[categoryName.replaceAll(/\s+/g, "")] ??
		DEFAULT_COLORS
	);
};

export { transformCategoryToGradientColors };
