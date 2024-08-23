import { AppRoute } from "~/libs/enums/enums.js";
import { SidebarItem } from "~/libs/types/sidebar-item.type.js";

const sidebarItems: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: "MY_WHEEL_ACTIVE",
			inactive: "MY_WHEEL_INACTIVE",
		},
		title: "My Wheel",
	},
] as const;

export { sidebarItems };
