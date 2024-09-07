import { type ChartArea, type RadialLinearScale } from "~/libs/types/types.js";

type ChartLabelsData = {
	chartArea: ChartArea;
	context: CanvasRenderingContext2D;
	label: string;
	middleAngle: number;
	scale: RadialLinearScale;
};

export { type ChartLabelsData };
