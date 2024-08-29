import { type ValueOf } from "shared";

import { type GradientColor } from "~/libs/enums/enums";

type WheelDataItem = {
	colors: ValueOf<typeof GradientColor>;
	label: string;
	score: number;
};

export { type WheelDataItem };
