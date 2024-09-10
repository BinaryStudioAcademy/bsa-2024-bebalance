import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	gradient: {
		borderRadius: 20,
		height: 6.5,
		position: "relative",
	},
	labelContainer: {
		bottom: 10,
		position: "absolute",
	},
	labelText: {
		backgroundColor: BaseColor.BLACK,
		color: BaseColor.BG_WHITE,
		paddingHorizontal: 1,
		position: "absolute",
	},
	slider: {
		padding: 0,
		position: "absolute",
		width: "105%",
	},
	sliderContainer: {
		borderRadius: 20,
		position: "relative",
		width: "100%",
	},
	sliderSection: {
		position: "absolute",
	},
});

export { styles };
