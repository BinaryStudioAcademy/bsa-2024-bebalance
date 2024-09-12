import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		height: "100%",
		justifyContent: "space-evenly",
	},
	date: {
		backgroundColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderRadius: 22,
		width: "60%",
	},
});

export { styles };
