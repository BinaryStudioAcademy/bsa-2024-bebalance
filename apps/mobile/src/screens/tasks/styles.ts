import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	background: {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
	},
	backgroundContainer: {
		marginVertical: -10,
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	empty: {
		opacity: 1,
		textAlign: "center",
	},
	switch: {
		maxWidth: "50%",
	},
});

export { styles };
