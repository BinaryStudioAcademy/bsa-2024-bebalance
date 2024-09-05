import { StyleSheet } from "react-native";

import { globalStyles } from "~/libs/styles/styles";

const styles = StyleSheet.create({
	container: {
		...globalStyles.alignItemsCenter,
		...globalStyles.flexDirectionRow,
		...globalStyles.gap12,
		...globalStyles.mt24,
	},
});

export { styles };
