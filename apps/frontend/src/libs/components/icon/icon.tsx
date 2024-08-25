import { iconNameToSvg } from "~/libs/maps/maps.js";
import { IconName } from "~/libs/types/types.js";

type Properties = {
	name: IconName;
};

const Icon: React.FC<Properties> = ({ name }: Properties) => {
	const Icon = iconNameToSvg[name];
	return <Icon />;
};

export { Icon };
