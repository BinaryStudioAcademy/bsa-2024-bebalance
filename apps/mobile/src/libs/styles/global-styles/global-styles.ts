import { StyleSheet } from "react-native";

import { FLEX } from "~/libs/styles/global-styles/flex";
import { GAPS } from "~/libs/styles/global-styles/gaps";
import { MARGINS } from "~/libs/styles/global-styles/margins";
import { PADDINGS } from "~/libs/styles/global-styles/paddings";

const globalStyles = StyleSheet.create({
	...FLEX,
	...GAPS,
	...MARGINS,
	...PADDINGS,
});

export { globalStyles };
