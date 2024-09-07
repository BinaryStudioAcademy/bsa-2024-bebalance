import React from "react";

import { Wheel } from "~/libs/components/components";
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
			animationDuration={animationDuration}
			animationRepetitions={Infinity}
			isLabelShown={false}
			size={size}
		/>
	);
};

export { WheelLoader };
