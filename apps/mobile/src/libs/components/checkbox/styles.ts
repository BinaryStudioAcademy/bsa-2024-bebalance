import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/app/base-color.enum";

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
		paddingLeft: 71,
		shadowColor: BaseColor.CHECKBOX_BLUE,
	},
});

export { styles };
