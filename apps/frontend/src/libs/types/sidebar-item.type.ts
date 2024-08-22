import { AppRoute } from "~/libs/enums/enums.js";
import { type SidebarIcon, type ValueOf } from "~/libs/types/types.js";

type SidebarItem = {
	href: ValueOf<typeof AppRoute>;
	icon: SidebarIcon;
	title: string;
};

export { SidebarItem };
