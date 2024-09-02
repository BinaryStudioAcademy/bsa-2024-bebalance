import { StyleSheet } from "react-native";

import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		...globalStyles.mt24,
	},
});

export { styles };
