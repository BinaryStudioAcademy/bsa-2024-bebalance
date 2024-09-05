import { type StyleProp, type TextStyle } from "~/libs/types/types";

import { fontWeightToFamilyMap, sizeToStyleMap } from "./maps";

type Preset =
	| "default"
	| "heading"
	| "regular"
	| "subheading"
	| "tabBarLabel"
	| "tag"
	| "uppercase";

const BASE_STYLES = [sizeToStyleMap.md, fontWeightToFamilyMap.regular];

const presetToStyleMap: Record<Preset, StyleProp<TextStyle>> = {
	default: BASE_STYLES,
	heading: [sizeToStyleMap.xxl, fontWeightToFamilyMap.bold],
	regular: [sizeToStyleMap.md, fontWeightToFamilyMap.semiBold],
	subheading: [sizeToStyleMap.lg, fontWeightToFamilyMap.semiBold],
	tabBarLabel: [sizeToStyleMap.xxs, fontWeightToFamilyMap.bold],
	tag: [sizeToStyleMap.xs, fontWeightToFamilyMap.semiBold],
	uppercase: [...BASE_STYLES, { textTransform: "uppercase" }],
};

export { presetToStyleMap };
