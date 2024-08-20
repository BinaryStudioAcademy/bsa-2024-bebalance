import React from "react";

import { ActivityIndicator } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/app/base-color.enum";
import { globalStyles } from "~/libs/styles/styles";

type Properties = {
	children: React.ReactNode;
	isLoading: boolean;
};

const LoaderWrapper: React.FC<Properties> = ({ children, isLoading }) => {
	return isLoading ? (
		<ActivityIndicator
			color={BaseColor.BG_BLUE}
			size="large"
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.alignItemsCenter,
			]}
		/>
	) : (
		<>{children}</>
	);
};

export { LoaderWrapper };
