import { StyleSheet } from "react-native";

import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	title: {
		textAlign: "center",
		...globalStyles.mv48,
	},
});

export { styles };
