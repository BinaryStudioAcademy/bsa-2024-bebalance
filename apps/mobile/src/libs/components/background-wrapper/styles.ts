import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	bottomImage: {
		bottom: 0,
		left: 0,
	},
	bottomPlanet: {
		bottom: "3%",
		right: "0%",
	},
	container: {
		backgroundColor: BaseColor.BG_BLUE,
	},
	dot: {
		backgroundColor: BaseColor.BG_WHITE,
		borderRadius: 2.5,
		height: 5,
		position: "absolute",
		width: 5,
	},
	dotPositionBottom: {
		bottom: "20%",
		left: "50%",
	},
	dotPositionLeft: {
		bottom: "45%",
		left: "10%",
	},
	dotPositionRight: {
		right: "10%",
		top: "35%",
	},
	dotPositionRightBottom: {
		right: "30%",
		top: "65%",
	},
	dotPositionTop: {
		left: "25%",
		top: "25%",
	},
	image: {
		position: "absolute",
	},
	leftPlanet: {
		left: "10%",
		top: "50%",
	},
	topImage: {
		right: 0,
		top: 0,
	},
	topPlanet: {
		right: "20%",
		top: "10%",
	},
});

export { styles };
