import React from "react";

import {
	LinearGradient,
	MaskedView,
	MaterialIcon,
} from "~/libs/components/components";
import { type IconName, type LinearGradientProps } from "~/libs/types/types";

type Properties = {
	gradientProps: LinearGradientProps;
	name: IconName;
	size: number;
};

const GradientIcon: React.FC<Properties> = ({ gradientProps, name, size }) => {
	return (
		<MaskedView maskElement={<MaterialIcon name={name} size={size} />}>
			<LinearGradient {...gradientProps}>
				<MaterialIcon color="transparent" name={name} size={size} />
			</LinearGradient>
		</MaskedView>
	);
};

export { GradientIcon };
