import React from "react";
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

const ZERO_PADDING = 0;
const DEFAULT_SAFE_AREA_EDGES: Edge[] = ["top", "bottom", "left", "right"];

type Properties = {
	children: React.ReactNode;
	edges?: Edge[];
};

const ScreenWrapper: React.FC<Properties> = ({ children, edges }) => {
	const insets = useSafeAreaInsets();

	const localEdges = edges || DEFAULT_SAFE_AREA_EDGES;

	const paddingStyle = {
		paddingBottom: localEdges.includes("bottom") ? insets.bottom : ZERO_PADDING,
		paddingLeft: localEdges.includes("left") ? insets.left : ZERO_PADDING,
		paddingRight: localEdges.includes("right") ? insets.right : ZERO_PADDING,
		paddingTop: localEdges.includes("top") ? insets.top : ZERO_PADDING,
	};

	return <View style={[globalStyles.flex1, paddingStyle]}>{children}</View>;
};

export { ScreenWrapper };
