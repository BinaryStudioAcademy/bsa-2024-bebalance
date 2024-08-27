import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		zIndex: 1,
	},
	header: {
		textAlign: "center",
	},
	text: {
		backgroundColor: BaseColor.DARK_BLUE,
		borderRadius: 14,
	},
});

export { styles };
