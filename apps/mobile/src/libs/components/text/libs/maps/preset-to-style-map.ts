import { type StyleProp, type TextStyle } from "~/libs/types/types";

import { fontWeightToFamilyMap, sizeToStyleMap } from "./maps";

type Preset =
	| "default"
	| "heading"
	| "subheading"
	| "tabBarLabel"
	| "uppercase";

const BASE_STYLES = [sizeToStyleMap.md, fontWeightToFamilyMap.regular];

const presetToStyleMap: Record<Preset, StyleProp<TextStyle>> = {
	default: BASE_STYLES,
	heading: [sizeToStyleMap.xxl, fontWeightToFamilyMap.bold],
	subheading: [sizeToStyleMap.lg, fontWeightToFamilyMap.semiBold],
	tabBarLabel: [sizeToStyleMap.xxs, fontWeightToFamilyMap.bold],
	uppercase: [...BASE_STYLES, { textTransform: "uppercase" }],
};

export { presetToStyleMap };
