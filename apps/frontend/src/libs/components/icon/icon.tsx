import { type CSSProperties, type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";

type Properties = {
	name: IconName;
	style?: CSSProperties | undefined;
};

const Icon: React.FC<Properties> = ({ name, style }: Properties) => {
	const Icon = iconNameToSvg[name];

	return <Icon style={style} />;
};

export { Icon };
