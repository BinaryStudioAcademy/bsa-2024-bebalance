import { type StyleProp, type TextStyle } from "~/libs/types/types";

import { fontWeightToFamily, sizeToTextStyle } from "../maps";

type Preset =
	| "default"
	| "heading"
	| "regular"
	| "subheading"
	| "tabBarLabel"
	| "tag"
	| "uppercase";

const BASE_STYLES = [sizeToTextStyle.md, fontWeightToFamily.regular];

const presetToTextStyle: Record<Preset, StyleProp<TextStyle>> = {
	default: BASE_STYLES,
	heading: [sizeToTextStyle.xxl, fontWeightToFamily.bold],
	regular: [sizeToTextStyle.sm, fontWeightToFamily.semiBold],
	subheading: [sizeToTextStyle.lg, fontWeightToFamily.semiBold],
	tabBarLabel: [sizeToTextStyle.xxs, fontWeightToFamily.bold],
	tag: [sizeToTextStyle.xs, fontWeightToFamily.semiBold],
	uppercase: [...BASE_STYLES, { textTransform: "uppercase" }],
};

export { presetToTextStyle };
