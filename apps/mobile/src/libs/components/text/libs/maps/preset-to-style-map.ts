import type { StyleProp, TextStyle } from "react-native";

import { fontWeightToFamilyMap, sizeToStyleMap } from "./maps";

const presetToStyleMap: Record<
	"default" | "heading" | "subheading",
	StyleProp<TextStyle>
> = {
	default: [sizeToStyleMap.md, fontWeightToFamilyMap.regular],
	heading: [sizeToStyleMap.xxl, fontWeightToFamilyMap.bold],
	subheading: [sizeToStyleMap.lg, fontWeightToFamilyMap.semiBold],
};

export { presetToStyleMap };
