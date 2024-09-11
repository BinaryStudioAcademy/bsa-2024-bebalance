import {
	type colorToGradientColors,
	type directionToGradient,
	type sizeToStyles,
} from "~/libs/maps/maps";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

type Preset = "default" | "signIn" | "signUp" | "welcome" | "wheelLoading";

type Properties = {
	absolutePosition: StyleProp<ViewStyle>;
	color: keyof typeof colorToGradientColors;
	gradientDirection?: keyof typeof directionToGradient;
	shouldOverlapChildren?: boolean;
	size: keyof typeof sizeToStyles;
};

const presetToPlanetPositionMap: Record<Preset, Properties[]> = {
	default: [
		{
			absolutePosition: { bottom: "92%", right: "25%" },
			color: "blue",
			gradientDirection: "topToBottom",
			size: "md",
		},
		{
			absolutePosition: {
				right: "70%",
				top: "86%",
			},
			color: "pink",
			size: "lg",
		},
	],
	signIn: [
		{
			absolutePosition: { bottom: "92%", left: "20%" },
			color: "lime",
			gradientDirection: "rightToLeft",
			size: "lg",
		},
		{
			absolutePosition: { bottom: "12%", left: "87%" },
			color: "blue",
			gradientDirection: "topToBottom",
			shouldOverlapChildren: true,
			size: "sm",
		},
	],
	signUp: [
		{
			absolutePosition: { bottom: "92%", right: "27%" },
			color: "blue",
			gradientDirection: "topToBottom",
			size: "sm",
		},
		{
			absolutePosition: { right: "68%", top: "86%" },
			color: "lime",
			gradientDirection: "rightToLeft",
			size: "xl",
		},
	],
	welcome: [
		{
			absolutePosition: { right: "88%", top: "36%" },
			color: "blue",
			gradientDirection: "topToBottom",
			size: "sm",
		},
		{
			absolutePosition: { bottom: "12%", left: "70%" },
			color: "pink",
			size: "lg",
		},
		{
			absolutePosition: { bottom: "91%", right: "31%" },
			color: "lime",
			gradientDirection: "rightToLeft",
			size: "md",
		},
	],
	wheelLoading: [
		{
			absolutePosition: { right: "87%", top: "32%" },
			color: "blue",
			gradientDirection: "topToBottom",
			size: "md",
		},
		{
			absolutePosition: { right: "16%", top: "7%" },
			color: "lime",
			size: "xxs",
		},
		{
			absolutePosition: {
				bottom: "16%",
				right: "7%",
			},
			color: "pink",
			size: "xs",
		},
	],
};

export { presetToPlanetPositionMap };
