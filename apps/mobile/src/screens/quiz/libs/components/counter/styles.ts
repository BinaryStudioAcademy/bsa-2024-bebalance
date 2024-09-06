import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		backgroundColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderRadius: 14,
	},
	currentStep: {
		color: BaseColor.BLACK,
	},
	divider: {
		color: BaseColor.GRAY,
	},
	totalSteps: {
		color: BaseColor.GRAY,
	},
});

export { styles };
