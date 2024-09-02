import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		minHeight: "95%",
		width: "100%",
	},
	wideView: {
		minHeight: "100%",
		minWidth: "100%",
	},
});

export { styles };
