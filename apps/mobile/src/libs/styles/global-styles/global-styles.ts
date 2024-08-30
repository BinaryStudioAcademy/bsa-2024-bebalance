import { StyleSheet } from "react-native";

import { Flex } from "./flex";
import { Gap } from "./gap";
import { Margin } from "./margin";
import { Padding } from "./padding";
import { visuallyHidden } from "./visually-hidden";

const globalStyles = StyleSheet.create({
	...Flex,
	...Gap,
	...Margin,
	...Padding,
	...visuallyHidden,
});

export { globalStyles };
