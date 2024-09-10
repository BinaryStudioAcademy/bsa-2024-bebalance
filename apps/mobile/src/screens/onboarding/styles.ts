import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	buttonContainer: {
		bottom: 24,
		left: 24,
		position: "absolute",
		right: 24,
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		zIndex: 1,
	},
});

export { styles };
