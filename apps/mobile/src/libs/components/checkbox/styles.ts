import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	gradientContainer: {
		borderRadius: 32,
		padding: 2,
	},
	innerContainer: {
		backgroundColor: BaseColor.BG_WHITE,
		borderColor: BaseColor.BG_WHITE,
		borderRadius: 32,
		borderWidth: 1,
		elevation: 5,
		paddingLeft: 70,
		shadowColor: BaseColor.CHECKBOX_BLUE,
	},
});

export { styles };
