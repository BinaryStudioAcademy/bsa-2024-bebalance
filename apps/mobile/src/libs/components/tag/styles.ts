import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	gradientContainer: {
		borderRadius: 17,
		height: 28,
		padding: 2,
		width: 100,
	},
	innerContainer: {
		backgroundColor: BaseColor.BG_WHITE,
		borderColor: BaseColor.BG_WHITE,
		borderRadius: 17,
		borderWidth: 1,
		width: "100%",
	},
	tagPlanet: {
		position: "relative",
	},
});

export { styles };
