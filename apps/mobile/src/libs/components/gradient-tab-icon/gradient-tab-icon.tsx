import React from "react";

import { GradientIcon, Icon } from "~/libs/components/components";
import { BaseColor, GradientColor } from "~/libs/enums/enums";
import { type IconName } from "~/libs/types/types";

const iconColor = [...GradientColor.BLUE];
const iconSize = 20;

const iconGradientOptions = {
	colors: iconColor,
	end: { x: 1, y: 1 },
	start: { x: 0, y: 0 },
};

type Properties = {
	focused: boolean;
	name: IconName;
};

const GradientTabIcon: React.FC<Properties> = ({ focused, name }) => {
	if (focused) {
		return (
			<GradientIcon
				gradientProps={iconGradientOptions}
				name={name}
				size={iconSize}
			/>
		);
	}
	return <Icon color={BaseColor.GRAY} name={name} size={iconSize} />;
};

export { GradientTabIcon };
