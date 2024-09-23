import { StyleSheet } from "react-native";

import { BaseColor } from "~/libs/enums/enums";

const boxShadow = StyleSheet.create({
	boxShadow: {
		shadowColor: BaseColor.BLACK,
		shadowOffset: {
			height: 1,
			width: 0,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		width: "90%",
	},
});

export { boxShadow };
