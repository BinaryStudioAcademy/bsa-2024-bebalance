import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	active: {
		color: BaseColor.BLACK,
	},
	activeTab: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	container: {
		backgroundColor: BaseColor.BG_LIGHT,
		borderRadius: 30,
	},
	disabledTab: {
		opacity: 0.5,
	},
	inactive: {
		color: BaseColor.GRAY,
	},
	inactiveTab: {
		backgroundColor: "transparent",
	},
	tab: {
		borderRadius: 30,
		width: "100%",
	},
});

export { styles };
