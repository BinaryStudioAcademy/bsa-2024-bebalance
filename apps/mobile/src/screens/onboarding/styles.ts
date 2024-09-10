import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	buttonContainer: {
		bottom: 16,
		left: 16,
		position: "absolute",
		right: 16,
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		zIndex: 1,
	},
});

export { styles };
