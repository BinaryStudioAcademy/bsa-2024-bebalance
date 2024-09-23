import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";
import { Spacing } from "~/libs/styles/global-styles/spacing";

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: BaseColor.TRANSPARENT_BLACK,
		...StyleSheet.absoluteFillObject,
	},
	container: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: Spacing.sm,
		overflow: "hidden",
		width: "90%",
		zIndex: 100,
	},
});

export { styles };
