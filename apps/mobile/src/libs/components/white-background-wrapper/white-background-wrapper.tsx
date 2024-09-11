import React from "react";

import { View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	children: React.ReactNode;
};

const WhiteBackgroundWrapper: React.FC<Properties> = ({ children }) => {
	return <View style={[globalStyles.flex1, styles.container]}>{children}</View>;
};

export { WhiteBackgroundWrapper };
