import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		zIndex: 1,
	},
	image: {
		alignSelf: "center",
		maxHeight: 153,
		maxWidth: 164,
	},
	text: {
		textAlign: "center",
	},
});

export { styles };
