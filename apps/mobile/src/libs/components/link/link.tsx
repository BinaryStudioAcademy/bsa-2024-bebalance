import { Link as UILink } from "@react-navigation/native";
import React, { type ComponentProps } from "react";

type Properties = {
	label: string;
	to: ComponentProps<typeof UILink>["to"];
};

const Link: React.FC<Properties> = ({ label, to }) => {
	return <UILink to={to}>{label}</UILink>;
};

export { Link };
