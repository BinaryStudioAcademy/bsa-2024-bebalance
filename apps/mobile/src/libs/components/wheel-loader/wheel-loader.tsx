import React from "react";

import { Wheel } from "~/libs/components/components";
import { AnimationName, GradientColor } from "~/libs/enums/enums";

type Properties = {
	animationDuration: number;
	size: number;
};

const mockData = [
	{ colors: GradientColor.YELLOW, label: "Physical", score: 8 },
	{ colors: GradientColor.LIME, label: "Work", score: 5 },
	{ colors: GradientColor.VIOLET, label: "Friends", score: 6 },
	{ colors: GradientColor.RED, label: "Love", score: 4 },
	{ colors: GradientColor.GREEN, label: "Money", score: 10 },
	{ colors: GradientColor.ROSE, label: "Free time", score: 9 },
	{ colors: GradientColor.ORANGE, label: "Spiritual", score: 6 },
	{ colors: GradientColor.BLUE, label: "Mental", score: 7 },
];

const WheelLoader: React.FC<Properties> = ({
	animationDuration,
	size,
}: Properties) => {
	return (
		<Wheel
			animation={AnimationName.PULSE}
			animationRepetitions={Infinity}
			animationTime={animationDuration}
			categoriesData={mockData}
			isLabelShown={false}
			size={size}
		/>
	);
};

export { WheelLoader };
