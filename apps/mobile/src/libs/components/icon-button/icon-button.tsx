import React from "react";

import { Icon, TouchableOpacity } from "~/libs/components/components";
import { type BaseColor } from "~/libs/enums/enums";
import {
	type IconName,
	type StyleProp,
	type ValueOf,
	type ViewStyle,
} from "~/libs/types/types";

type Properties = {
	iconColor: ValueOf<typeof BaseColor>;
	iconSize: number;
	name: IconName;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
};

const IconButton: React.FC<Properties> = ({
	iconColor,
	iconSize,
	name,
	onPress,
	style,
}) => {
	return (
		<TouchableOpacity hitSlop={10} onPress={onPress} style={style}>
			<Icon color={iconColor} name={name} size={iconSize} />
		</TouchableOpacity>
	);
};

export { IconButton };
