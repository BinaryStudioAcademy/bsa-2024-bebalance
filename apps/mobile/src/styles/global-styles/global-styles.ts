import { StyleSheet } from "react-native";
import { FLEX } from "~/styles/global-styles/flex";
import { GAPS } from "~/styles/global-styles/gaps";
import { MARGINS } from "~/styles/global-styles/margins";
import { PADDINGS } from "~/styles/global-styles/paddings";

const globalStyles = StyleSheet.create({
	...FLEX,
	...GAPS,
	...MARGINS,
	...PADDINGS,
});

export { globalStyles };
