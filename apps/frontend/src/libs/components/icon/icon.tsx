import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";

type Properties = {
	color?: string | undefined;
	name: IconName;
};

const Icon: React.FC<Properties> = ({ color, name }: Properties) => {
	const Icon = iconNameToSvg[name];

	return <Icon color={color} />;
};

export { Icon };
