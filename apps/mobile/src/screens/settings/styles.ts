import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/app/base-color.enum";

const styles = StyleSheet.create({
	checkbox: {
		borderRadius: 10,
		paddingLeft: 0,
	},
	checkboxContainer: {
		borderRadius: 10,
		width: "48%",
	},
	checkboxWrapper: {
		flexWrap: "wrap",
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	radioContainer: {
		borderBottomWidth: 4,
		borderColor: BaseColor.EXTRA_LIGHT_GRAY,
	},
});

export { styles };
