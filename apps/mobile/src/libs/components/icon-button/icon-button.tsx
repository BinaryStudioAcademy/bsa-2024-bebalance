import React from "react";

import { MaterialIcon, Pressable } from "~/libs/components/components";
import { type BaseColor } from "~/libs/enums/enums";
import { type ValueOf } from "~/libs/types/types";

type Properties = {
	color: ValueOf<typeof BaseColor>;
	name: string;
	onPress: () => void;
	size: number;
};

const IconButton: React.FC<Properties> = ({ color, name, onPress, size }) => {
	return (
		<Pressable onPress={onPress}>
			<MaterialIcon color={color} name={name} size={size} />
		</Pressable>
	);
};

export { IconButton };
