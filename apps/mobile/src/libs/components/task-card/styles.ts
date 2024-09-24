import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	actions: {
		borderTopColor: BaseColor.LIGHT_GRAY,
		borderTopWidth: 1,
	},
	container: {
		borderColor: BaseColor.LIGHT_GRAY,
		borderRadius: 16,
		borderWidth: 1,
		height: 250,
	},
	description: {
		height: 50,
		width: "80%",
	},
	edit: {
		backgroundColor: BaseColor.LIGHT_GRAY,
		borderRadius: 20,
	},
});

export { styles };
