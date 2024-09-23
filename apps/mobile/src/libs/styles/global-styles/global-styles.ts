import { StyleSheet } from "react-native";

import { boxShadow } from "./box-shadow";
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
	...boxShadow,
});

export { globalStyles };
