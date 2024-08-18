import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	btn: {
		alignItems: "center",
		backgroundColor: BaseColor.BLACK,
		padding: 10,
	},
	label: {
		color: "white",
	},
});

export { styles };
