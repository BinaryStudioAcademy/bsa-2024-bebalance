import { AppRoute } from "~/libs/enums/enums.js";
import { type SidebarItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: SidebarItem[] = [
	{
		href: AppRoute.ROOT,
		icon: {
			active: "wheelActive",
			inactive: "wheelInactive",
		},
		label: "My Wheel",
	},
	{
		href: AppRoute.TASKS,
		icon: {
			active: "tasksActive",
			inactive: "tasksInactive",
		},
		label: "My Tasks",
	},
];

export { SIDEBAR_ITEMS };
