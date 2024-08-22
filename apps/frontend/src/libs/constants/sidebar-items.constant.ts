import wheelOfBalance from "~/assets/img/wheel-of-balance-active.svg";
import wheelOfBalanceInactive from "~/assets/img/wheel-of-balance-inactive.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import { SidebarItem } from "~/libs/types/sidebar-item.type.js";

const sidebarItems: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: wheelOfBalance,
			inactive: wheelOfBalanceInactive,
		},
		title: "My Wheel",
	},
] as const;

export { sidebarItems };
