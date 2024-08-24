import { AppRoute } from "~/libs/enums/enums.js";
import { SidebarItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: "myWheelActive",
			inactive: "myWheelInactive",
		},
		title: "My Wheel",
	},
];

export { sidebarItems };
