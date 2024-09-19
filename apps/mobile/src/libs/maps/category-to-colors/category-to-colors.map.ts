import { type colorToGradientColors } from "~/libs/maps/maps";

const categoryToColors: { [key: string]: keyof typeof colorToGradientColors } =
	{
		Freetime: "pink",
		Friends: "violet",
		Love: "red",
		Mental: "blue",
		Money: "green",
		Physical: "yellow",
		Spiritual: "orange",
		Work: "lime",
	};

export { categoryToColors };
