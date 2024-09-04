import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	buttonsContainer: {
		gap: 15,
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 30,
		zIndex: 1,
		...globalStyles.flex1,
		...globalStyles.mb16,
		...globalStyles.mh12,
		...globalStyles.mt12,
		...globalStyles.p24,
	},
	title: {
		textAlign: "center",
		...globalStyles.mv48,
	},
});

export { styles };
