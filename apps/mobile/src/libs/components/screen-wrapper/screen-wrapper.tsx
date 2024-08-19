import React from "react";
import { type Edge, useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

const ZERO_PADDING = 0;
const DEFAULT_SAFE_AREA_EDGES: Edge[] = ["top", "bottom", "left", "right"];

type Properties = {
	children: React.ReactNode;
	edges?: Edge[];
};

const ScreenWrapper: React.FC<Properties> = ({
	children,
	edges = DEFAULT_SAFE_AREA_EDGES,
}) => {
	const insets = useSafeAreaInsets();

	const paddingStyle = {
		paddingBottom: edges?.includes("bottom") ? insets.bottom : ZERO_PADDING,
		paddingLeft: edges?.includes("left") ? insets.left : ZERO_PADDING,
		paddingRight: edges?.includes("right") ? insets.right : ZERO_PADDING,
		paddingTop: edges?.includes("top") ? insets.top : ZERO_PADDING,
	};

	return <View style={[globalStyles.flex1, paddingStyle]}>{children}</View>;
};

export { ScreenWrapper };
