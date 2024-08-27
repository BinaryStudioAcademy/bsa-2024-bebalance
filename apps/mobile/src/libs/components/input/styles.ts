import { StyleSheet } from "react-native";

import { GradientColor } from "~/libs/enums/enums";

const COLOR_INDEX = 0;
const styles = StyleSheet.create({
	input: {
		borderColor: GradientColor.BLUE[COLOR_INDEX],
		borderWidth: 1,
		fontFamily: "Nunito-Regular",
	},
});

export { styles };
