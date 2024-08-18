import React, { ReactNode } from "react";
import { Text as RNText, TextStyle } from "react-native";

import { styles } from "./styles";

type TextProperties = {
	children: ReactNode;
	style?: TextStyle | TextStyle[];
};

const Text = ({ children, style }: TextProperties) => {
	return <RNText style={[styles.text, style]}>{children}</RNText>;
};

export { Text };
