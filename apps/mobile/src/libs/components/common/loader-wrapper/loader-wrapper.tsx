import React from "react";
import { ActivityIndicator } from "react-native";

import { View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/app/base-color.enum";
import { globalStyles } from "~/libs/styles/styles";

type Properties = {
	children: React.ReactNode;
	isLoading: boolean;
};

const LoaderWrapper: React.FC<Properties> = ({ children, isLoading }) => {
	const renderContent = () => {
		if (isLoading) {
			return <ActivityIndicator color={BaseColor.BG_BLUE} size="large" />;
		}
		return children;
	};

	return (
		<View style={[globalStyles.flex1, globalStyles.justifyContentCenter]}>
			{renderContent()}
		</View>
	);
};

export { LoaderWrapper };
