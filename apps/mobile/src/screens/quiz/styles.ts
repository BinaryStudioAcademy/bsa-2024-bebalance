import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		paddingTop: 70,
		zIndex: 1,
	},
	title: {
		textAlign: "center",
	},
});

export { styles };
