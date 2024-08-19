import { StyleSheet } from "react-native";

import { Flex } from "./flex";
import { Gap } from "./gap";
import { Margin } from "./margin";
import { Padding } from "./padding";

const globalStyles = StyleSheet.create({
	...Flex,
	...Gap,
	...Margin,
	...Padding,
});

export { globalStyles };
