import { Link as UILink } from "@react-navigation/native";
import React, { type ComponentProps } from "react";

import { styles } from "./styles";

type Properties = {
	label: string;
	to: ComponentProps<typeof UILink>["to"];
};

const Link: React.FC<Properties> = ({ label, to }) => {
	return (
		<UILink style={styles.link} to={to}>
			{label}
		</UILink>
	);
};

export { Link };
