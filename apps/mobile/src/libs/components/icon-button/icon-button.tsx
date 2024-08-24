import React from "react";

import { MaterialIcon, Pressable } from "~/libs/components/components";

type Properties = {
	color: string;
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
