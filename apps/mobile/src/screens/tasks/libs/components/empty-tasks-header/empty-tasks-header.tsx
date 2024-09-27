import React from "react";

import { Text, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	content: string;
};

const EmptyTasksHeader: React.FC<Properties> = ({ content }) => {
	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.alignItemsCenter,
				globalStyles.justifyContentCenter,
			]}
		>
			<Text
				preset="subheading"
				style={[globalStyles.ph32, styles.content]}
				weight="bold"
			>
				{content}
			</Text>
		</View>
	);
};

export { EmptyTasksHeader };
