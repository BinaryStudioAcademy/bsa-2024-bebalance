import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	errorText: {
		alignSelf: "center",
		color: BaseColor.RED,
		position: "absolute",
		top: -6,
	},
});

export { styles };
