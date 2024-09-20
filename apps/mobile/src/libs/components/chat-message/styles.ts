import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_LIGHT,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 10,
		flex: 1,
	},
	userContainer: {
		backgroundColor: BaseColor.LIGHT_BLUE,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 0,
	},
	userWrapper: {
		flexDirection: "row-reverse",
	},
});

export { styles };
