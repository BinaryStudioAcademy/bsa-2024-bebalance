import { AppRoute } from "~/libs/enums/enums.js";
import { SidebarItem } from "~/libs/types/types.js";

const sidebarItems: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: "my-wheel-active",
			inactive: "my-wheel-inactive",
		},
		title: "My Wheel",
	},
] as const;

export { sidebarItems };
