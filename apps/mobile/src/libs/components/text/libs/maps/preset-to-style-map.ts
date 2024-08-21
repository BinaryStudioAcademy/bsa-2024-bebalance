import { type StyleProp, type TextStyle } from "~/libs/types/types";

import {
	fontWeightToFamilyMap,
	sizeToStyleMap,
	textTransformToStyleMap,
} from "./maps";

const presetToStyleMap: Record<
	"default" | "heading" | "subheading" | "uppercase",
	StyleProp<TextStyle>
> = {
	default: [sizeToStyleMap.md, fontWeightToFamilyMap.regular],
	heading: [sizeToStyleMap.xxl, fontWeightToFamilyMap.bold],
	subheading: [sizeToStyleMap.lg, fontWeightToFamilyMap.semiBold],
	uppercase: [textTransformToStyleMap.uppercase],
};

export { presetToStyleMap };
