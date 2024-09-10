import { type colorToGradientColors } from "~/libs/maps/maps";

type SliderData = {
	color: keyof typeof colorToGradientColors;
	initValue: number;
	label: string;
};

export { type SliderData };
