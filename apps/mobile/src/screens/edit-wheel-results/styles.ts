import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	checkboxForm: {
		borderColor: BaseColor.LIGHT_GRAY,
		borderRadius: 14,
		borderWidth: 1,
	},
	container: {
		marginBottom: 0,
	},
	screenWrapper: {
		backgroundColor: BaseColor.BG_WHITE,
	},
});

export { styles };
