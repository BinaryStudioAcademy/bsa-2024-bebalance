import { type colorToGradientColors } from "~/libs/maps/maps";

type SliderData = {
	color: keyof typeof colorToGradientColors;
	label: string;
};

export { type SliderData };
