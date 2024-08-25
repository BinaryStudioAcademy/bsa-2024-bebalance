import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	commonItemContainer: {
		backgroundColor: BaseColor.BG_WHITE,
		borderColor: BaseColor.BG_BLUE,
		borderRadius: 8,
		borderWidth: 2,
		paddingHorizontal: 10,
		paddingVertical: 8,
		width: "100%",
	},
});

export { styles };
