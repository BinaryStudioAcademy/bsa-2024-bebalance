import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "space-evenly",
	},
	date: {
		backgroundColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderRadius: 22,
		width: "50%",
	},
});

export { styles };
