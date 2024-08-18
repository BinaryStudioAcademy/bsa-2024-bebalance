import { StyleSheet } from "react-native";

import { GradientColor } from "~/libs/enums/enums";

const colorIndex = 0;
const styles = StyleSheet.create({
	input: {
		borderColor: GradientColor.BLUE[colorIndex],
		borderWidth: 1,
	},
});

export { styles };
