import { StyleSheet } from "react-native";

import { GradientColor } from "~/libs/enums/enums";

const COLOR_INDEX = 1;
const styles = StyleSheet.create({
	link: {
		color: GradientColor.BLUE[COLOR_INDEX],
	},
});

export { styles };
