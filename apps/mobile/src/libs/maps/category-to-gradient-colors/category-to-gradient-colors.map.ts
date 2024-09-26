import { GradientColor } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

const categoryToGradientColors: {
	[key: string]: ValueOf<typeof GradientColor>;
} = {
	Freetime: GradientColor.ROSE,
	Friends: GradientColor.VIOLET,
	Love: GradientColor.RED,
	Mental: GradientColor.BLUE,
	Money: GradientColor.GREEN,
	Physical: GradientColor.YELLOW,
	Spiritual: GradientColor.ORANGE,
	Work: GradientColor.LIME,
};

export { categoryToGradientColors };
