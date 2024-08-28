import { StyleSheet } from "react-native";

const visuallyHidden = StyleSheet.create({
	Hidden: {
		height: 1,
		opacity: 0,
		overflow: "hidden",
		position: "absolute",
		width: 1,
	},
});

export { visuallyHidden };
