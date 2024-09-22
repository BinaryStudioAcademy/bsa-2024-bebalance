import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 10,
		elevation: 2,
		height: 70,
		overflow: "hidden",
	},
	iconWrapper: {
		borderRadius: 40,
		height: 40,
		width: 40,
	},
	typeIndicator: {
		borderBottomLeftRadius: 12,
		borderTopLeftRadius: 12,
		height: 70,
		width: 8,
	},
});

export { styles };
