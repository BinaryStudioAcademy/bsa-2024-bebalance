import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	checkboxForm: {
		borderColor: BaseColor.LIGHT_GRAY,
		borderRadius: 14,
		borderWidth: 1,
		height: "auto",
	},
	container: {
		marginBottom: 0,
		paddingBottom: 20,
	},
});

export { styles };
