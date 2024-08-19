import { StyleSheet } from "react-native";

import { globalStyles } from "~/libs/styles/global-styles/global-styles";

const styles = StyleSheet.create({
	container: {
		...globalStyles.flex1,
		...globalStyles.justifyContentCenter,
	},
});

export { styles };
