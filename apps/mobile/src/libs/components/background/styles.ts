import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/app/base-color.enum";

const styles = StyleSheet.create({
	container: {
		backgroundColor: BaseColor.BG_BLUE,
		flex: 1,
		position: "relative",
	},
});

export { styles };
