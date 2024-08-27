import { StyleSheet } from "react-native";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	bar: {
		height: 1,
		width: "100%",
	},
	dotContainer: {
		height: 12,
		width: 12,
	},
	dotBorder: {
		alignItems: "center",
		borderRadius: 12,
		height: 12,
		justifyContent: "center",
		width: 12,
	},
	dotCenter: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 8,
		height: 8,
		width: 8,
	},
	container: {
		alignItems: "center",
		...globalStyles.mt12,
	},
	backgroundBarStyle: {
		backgroundColor: BaseColor.GRAY,
		height: 1,
	},
	backgroundDotStyle: {
		backgroundColor: BaseColor.GRAY,
		height: 12,
		width: 12,
	},
	filledBarStyle: {
		backgroundColor: "transparent",
	},
	filledDotStyle: {
		backgroundColor: BaseColor.GRAY,
	}
});

export { styles };
