import { useCallback } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";

type Properties = {
	name: IconName;
	onClick?: (() => void) | undefined;
};

const Icon: React.FC<Properties> = ({ name, onClick }: Properties) => {
	const Icon = iconNameToSvg[name];

	const handleIconClick = useCallback((): void => {
		onClick?.();
	}, [onClick]);

	return <Icon onClick={handleIconClick} />;
};

export { Icon };
