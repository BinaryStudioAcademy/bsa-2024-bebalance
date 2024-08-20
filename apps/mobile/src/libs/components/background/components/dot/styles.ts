import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/app/base-color.enum";

const styles = StyleSheet.create({
	dot: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 2.5,
		height: 5,
		position: "absolute",
		width: 5,
	},
});

export { styles };
