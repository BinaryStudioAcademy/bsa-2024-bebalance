import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

type Properties = {
	children: React.ReactNode;
};

const LoaderWrapper: React.FC<Properties> = ({ children }) => {
	return <View style={[styles.container]}>{children}</View>;
};

export { LoaderWrapper };
