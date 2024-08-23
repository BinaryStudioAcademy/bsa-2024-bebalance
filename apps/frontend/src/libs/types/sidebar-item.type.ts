import { AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { IconName } from "./icon-name.type.js";

type SidebarItem = {
	href: ValueOf<typeof AppRoute>;
	icon: {
		active: IconName;
		inactive: IconName;
	};
	title: string;
};

export { SidebarItem };
