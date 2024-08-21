import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	bgWhite: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	rounded: {
		borderRadius: 35,
	},
	wrapper: {
		height: 42,
	},
});

export { styles };
