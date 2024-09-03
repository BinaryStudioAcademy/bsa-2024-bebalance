import { type GradientColor } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type WheelDataItem = {
	colors: ValueOf<typeof GradientColor>;
	label: string;
	score: number;
};

export { type WheelDataItem };
