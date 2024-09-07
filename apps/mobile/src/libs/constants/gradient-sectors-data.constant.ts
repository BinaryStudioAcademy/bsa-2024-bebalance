import { GradientColor } from "../enums/enums";
import { type WheelDataItem } from "../types/types";

const GRADIENT_SECTORS_DATA: WheelDataItem[] = [
	{ colors: GradientColor.YELLOW, label: "Physical", score: 9 },
	{ colors: GradientColor.LIME, label: "Work", score: 8 },
	{ colors: GradientColor.VIOLET, label: "Friends", score: 7 },
	{ colors: GradientColor.RED, label: "Love", score: 6 },
	{ colors: GradientColor.GREEN, label: "Money", score: 5 },
	{ colors: GradientColor.ROSE, label: "Free time", score: 8 },
	{ colors: GradientColor.ORANGE, label: "Spiritual", score: 5 },
	{ colors: GradientColor.BLUE, label: "Mental", score: 7 },
];

export { GRADIENT_SECTORS_DATA };
