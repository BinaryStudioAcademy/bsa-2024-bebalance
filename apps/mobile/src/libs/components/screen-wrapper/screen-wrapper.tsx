import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "~/libs/components/components";

type Properties = {
	children: React.ReactNode;
};

const ScreenWrapper: React.FC<Properties> = ({ children }) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			edges={["top", "bottom", "right", "left"]}
			style={{ flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top }}
		>
			{children}
		</View>
	);
};

export { ScreenWrapper };
