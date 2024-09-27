import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 20,
	},
	text: {
		textAlign: "center",
	},
	wrapper: {
		backgroundColor: BaseColor.BG_LIGHT,
	},
});

export { styles };
