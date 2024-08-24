import { iconNameToSvg } from "~/libs/maps/maps.js";
import { IconName } from "~/libs/types/icon-name.type.js";

type Properties = {
	name: IconName;
};

const Icon: React.FC<Properties> = ({ name }: Properties) => {
	return <img alt={name} src={iconNameToSvg.get(name)} />;
};

export { Icon };
