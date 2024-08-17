import { StyleSheet } from "react-native";

import { CommonColors } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	btn: {
		alignItems: "center",
		backgroundColor: CommonColors.BLACK,
		padding: 10,
	},
	label: {
		color: "white",
	},
});

export { styles };
