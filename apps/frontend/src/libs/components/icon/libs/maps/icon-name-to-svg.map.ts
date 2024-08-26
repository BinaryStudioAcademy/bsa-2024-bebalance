import Close from "~/assets/img/close.svg?react";
import Menu from "~/assets/img/menu.svg?react";
import WheelOfBalanceActive from "~/assets/img/wheel-of-balance-active.svg?react";
import WheelOfBalanceInactive from "~/assets/img/wheel-of-balance-inactive.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	close: Close,
	menu: Menu,
	wheelActive: WheelOfBalanceActive,
	wheelInactive: WheelOfBalanceInactive,
};

export { iconNameToSvg };
