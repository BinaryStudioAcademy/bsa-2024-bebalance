import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/app/base-color.enum";

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	container: {
		backgroundColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderRadius: 30,
	},
	inactiveTab: {
		backgroundColor: "transparent",
	},
	tab: {
		borderRadius: 30,
	},
});

export { styles };
