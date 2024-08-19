import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/libs/components/components";
import { ScreenWrapperEdge } from "~/libs/enums/app/screen-wrapper-edge.enum";
import { ValueOf } from "~/libs/types/types";

const ZERO_PADDING = 0;

type Properties = {
	children: React.ReactNode;
	edges?: ValueOf<typeof ScreenWrapperEdge>[];
};

const ScreenWrapper: React.FC<Properties> = ({ children, edges }) => {
	const insets = useSafeAreaInsets();

	const paddingStyle = {
		paddingBottom: edges?.includes(ScreenWrapperEdge.BOTTOM)
			? insets.bottom
			: ZERO_PADDING,
		paddingLeft: edges?.includes(ScreenWrapperEdge.LEFT)
			? insets.left
			: ZERO_PADDING,
		paddingRight: edges?.includes(ScreenWrapperEdge.RIGHT)
			? insets.right
			: ZERO_PADDING,
		paddingTop: edges?.includes(ScreenWrapperEdge.TOP)
			? insets.top
			: ZERO_PADDING,
	};

	return <View style={{ flex: 1, ...paddingStyle }}>{children}</View>;
};

export { ScreenWrapper };
