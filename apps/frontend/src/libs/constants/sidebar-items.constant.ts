import { AppRoute } from "~/libs/enums/enums.js";
import { type SidebarItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: "wheelActive",
			inactive: "wheelInactive",
		},
		title: "My Wheel",
	},
];

export { SIDEBAR_ITEMS };
