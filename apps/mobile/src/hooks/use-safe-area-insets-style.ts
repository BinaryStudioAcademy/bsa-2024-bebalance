import { useSafeAreaInsets, type Edge } from "react-native-safe-area-context";
import type { FlexStyle } from "react-native";

type ExtendedEdge = Edge | "start" | "end";

const propertyToSuffixMap = {
	top: "Top",
	bottom: "Bottom",
	left: "Start",
	right: "End",
	start: "Start",
	end: "End",
};

const edgeToInsetMap: Record<"start" | "end", Edge> = {
	start: "left",
	end: "right",
};

type UseSafeAreaInsetsStyle = Pick<
	FlexStyle,
	| "marginBottom"
	| "marginEnd"
	| "marginStart"
	| "marginTop"
	| "paddingBottom"
	| "paddingEnd"
	| "paddingStart"
	| "paddingTop"
>;

function useSafeAreaInsetsStyle(
	safeAreaEdges: ExtendedEdge[] = [],
	property: "padding" | "margin" = "padding",
): UseSafeAreaInsetsStyle {
	const insets = useSafeAreaInsets();

	return safeAreaEdges.reduce<UseSafeAreaInsetsStyle>((acc, edge) => {
		let value: Edge;

		if (edge === "start" || edge === "end") {
			value = edgeToInsetMap[edge];
		} else {
			value = edge;
		}

		return {
			...acc,
			[`${property}${propertyToSuffixMap[edge]}`]: insets[value],
		};
	}, {});
}

export { useSafeAreaInsetsStyle };
