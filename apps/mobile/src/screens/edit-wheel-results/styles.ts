import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	checkboxForm: {
		borderColor: BaseColor.LIGHT_GRAY,
		borderRadius: 14,
		borderWidth: 1,
		height: "100%",
	},
	container: {
		marginBottom: 0,
	},
});

export { styles };
