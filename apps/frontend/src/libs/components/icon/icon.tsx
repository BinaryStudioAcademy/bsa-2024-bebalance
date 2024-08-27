import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";

type Properties = {
	iconName: IconName;
};

const Icon: React.FC<Properties> = ({ iconName }: Properties) => {
	const Icon = iconNameToSvg[iconName];

	return <Icon />;
};

export { Icon };
