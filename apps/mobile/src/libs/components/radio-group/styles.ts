import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	commonItemContainer: {
		backgroundColor: BaseColor.BG_WHITE,
		borderColor: BaseColor.BG_BLUE,
		borderRadius: 8,
		borderWidth: 1,
		...globalStyles.p12,
		width: "100%",
	},
});

export { styles };
