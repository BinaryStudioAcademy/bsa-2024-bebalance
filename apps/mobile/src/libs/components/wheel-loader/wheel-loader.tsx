import React from "react";

import { Wheel } from "~/libs/components/components";
import { GRADIENT_SECTORS_DATA } from "~/libs/constants/gradient-sectors-data.constant";
import { AnimationName } from "~/libs/enums/enums";

type Properties = {
	animationDuration: number;
	size: number;
};

const WheelLoader: React.FC<Properties> = ({
	animationDuration,
	size,
}: Properties) => {
	return (
		<Wheel
			animation={AnimationName.PULSE}
			animationRepetitions={Infinity}
			animationTime={animationDuration}
			categoriesData={GRADIENT_SECTORS_DATA}
			isLabelShown={false}
			size={size}
		/>
	);
};

export { WheelLoader };
