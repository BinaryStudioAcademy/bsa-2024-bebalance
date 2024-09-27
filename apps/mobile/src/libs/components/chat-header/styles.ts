import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	header: {
		backgroundColor: BaseColor.BG_WHITE,
		borderBottomColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderBottomWidth: 1,
		height: 90,
	},
});

export { styles };
