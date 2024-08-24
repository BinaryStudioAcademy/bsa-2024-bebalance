import { iconNameToSvg } from "~/libs/maps/maps.js";
import { IconName } from "~/libs/types/icon-name.type.js";

type Properties = {
	name: IconName;
};

const Icon: React.FC<Properties> = ({ name }: Properties) => {
	const source = iconNameToSvg.get(name);
	return <img alt="" src={source} />;
};

export { Icon };
