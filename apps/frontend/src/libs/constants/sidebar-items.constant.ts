import { AppRoute } from "~/libs/enums/enums.js";
import { type SidebarItem } from "~/libs/types/types.js";

const SIDEBAR_ITEMS: SidebarItem[] = [
	{
		href: AppRoute.CHAT,
		icon: {
			active: "aiChatActive",
			inactive: "aiChatInactive",
		},
		label: "AI Assistant",
	},
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
	{
		href: AppRoute.SETTINGS,
		icon: {
			active: "settingsActive",
			inactive: "settingsInactive",
		},
		label: "Settings",
	},
];

export { SIDEBAR_ITEMS };
