import { Link as UILink } from "@react-navigation/native";
import React, { type ComponentProps } from "react";

import { type StyleProp, type TextStyle } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	label: string;
	style?: StyleProp<TextStyle>;
	to: ComponentProps<typeof UILink>["to"];
};

const Link: React.FC<Properties> = ({ label, style, to }) => {
	return (
		<UILink style={[styles.link, style]} to={to}>
			{label}
		</UILink>
	);
};

export { Link };
