import React from "react";
import { Pressable } from "react-native";

import { Text } from "~/libs/components/components";

import { styles } from "./styles";

type Properties = {
	label: string;
	onPress: () => void;
};

const Button: React.FC<Properties> = ({ label, onPress }) => {
	return (
		<Pressable style={styles.btn} onPress={onPress}>
			<Text style={styles.label}>{label}</Text>
		</Pressable>
	);
};

export { Button };
