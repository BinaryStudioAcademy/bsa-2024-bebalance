import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	actions: {
		borderTopWidth: 1,
	},
	actionsActive: {
		borderTopColor: BaseColor.BG_LIGHT,
	},
	actionsDisabled: {
		borderTopColor: BaseColor.BG_WHITE,
	},
	active: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	container: {
		borderColor: BaseColor.BG_LIGHT,
		borderRadius: 16,
		borderWidth: 1,
		height: 250,
	},
	description: {
		marginRight: "auto",
	},
	edit: {
		backgroundColor: BaseColor.BG_LIGHT,
		borderRadius: 20,
	},
	expired: {
		backgroundColor: BaseColor.BG_LIGHT,
	},
});

export { styles };
