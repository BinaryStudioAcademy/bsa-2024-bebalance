import React from "react";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
	children: React.ReactNode;
};

const SafeAreaScreenWrapper: React.FC<Props> = ({ children }) => {
	const insets = useSafeAreaInsets();

	return (
		<SafeAreaView
			style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
		>
			{children}
		</SafeAreaView>
	);
};

export { SafeAreaScreenWrapper };
