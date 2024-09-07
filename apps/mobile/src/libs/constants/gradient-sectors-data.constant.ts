import { GradientColor } from "../enums/enums";
import { type WheelDataItem } from "../types/types";

const GRADIENT_SECTORS_DATA: WheelDataItem[] = [
	{ colors: GradientColor.YELLOW, label: "Physical", score: 8 },
	{ colors: GradientColor.LIME, label: "Work", score: 5 },
	{ colors: GradientColor.VIOLET, label: "Friends", score: 6 },
	{ colors: GradientColor.RED, label: "Love", score: 4 },
	{ colors: GradientColor.GREEN, label: "Money", score: 10 },
	{ colors: GradientColor.ROSE, label: "Free time", score: 9 },
	{ colors: GradientColor.ORANGE, label: "Spiritual", score: 6 },
	{ colors: GradientColor.BLUE, label: "Mental", score: 7 },
];

export { GRADIENT_SECTORS_DATA };
