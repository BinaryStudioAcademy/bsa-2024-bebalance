import React from "react";

import { MaterialIcon } from "~/libs/components/components";
import { type BaseColor } from "~/libs/enums/enums";
import { type IconName, type ValueOf } from "~/libs/types/types";

type Properties = {
	color: ValueOf<typeof BaseColor>;
	name: IconName;
	size: number;
};

const Icon: React.FC<Properties> = ({ color, name, size }) => {
	return <MaterialIcon color={color} name={name} size={size} />;
};

export { Icon };
