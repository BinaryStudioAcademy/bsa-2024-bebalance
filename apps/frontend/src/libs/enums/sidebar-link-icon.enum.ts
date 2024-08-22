import wheelOFBalance from "~/assets/img/wheel-of-balance.svg";
import wheelOFBalanceInavtive from "~/assets/img/wheel-of-balance-inactive.svg";

const sidebarLinkIcon = {
	MY_WHEEL: {
		ACTIVE: wheelOFBalance,
		ALT: "Wheel of balance icon",
		INACTIVE: wheelOFBalanceInavtive,
	},
} as const;

export { sidebarLinkIcon };
