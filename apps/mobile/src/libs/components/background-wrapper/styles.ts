import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	bottomImage: {
		bottom: 0,
		left: 0,
	},
	container: {
		backgroundColor: BaseColor.BG_BLUE,
		position: "relative",
	},
	dot: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 2.5,
		height: 5,
		position: "absolute",
		width: 5,
	},
	dotPositionBottom: {
		bottom: "22%",
		left: "35%",
	},
	dotPositionLeft: {
		left: "10%",
		top: "66%",
	},
	dotPositionRight: {
		right: "8%",
		top: "45%",
	},
	dotPositionRightBottom: {
		right: "28%",
		top: "70%",
	},
	dotPositionTop: {
		left: "20%",
		top: "15%",
	},
	image: {
		position: "absolute",
	},
	topImage: {
		right: 0,
		top: 0,
	},
});

export { styles };
