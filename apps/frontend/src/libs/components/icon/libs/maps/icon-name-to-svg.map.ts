import CheckIcon from "~/assets/img/check-icon.svg?react";
import Close from "~/assets/img/close.svg?react";
import CrossedEye from "~/assets/img/crossed-eye.svg?react";
import Eye from "~/assets/img/eye.svg?react";
import Menu from "~/assets/img/menu.svg?react";
import SignOut from "~/assets/img/sign-out.svg?react";
import TasksActive from "~/assets/img/tasks-active.svg?react";
import TasksInactive from "~/assets/img/tasks-inactive.svg?react";
import WheelOfBalanceActive from "~/assets/img/wheel-of-balance-active.svg?react";
import WheelOfBalanceInactive from "~/assets/img/wheel-of-balance-inactive.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	check: CheckIcon,
	close: Close,
	crossedEye: CrossedEye,
	eye: Eye,
	menu: Menu,
	signOut: SignOut,
	tasksActive: TasksActive,
	tasksInactive: TasksInactive,
	wheelActive: WheelOfBalanceActive,
	wheelInactive: WheelOfBalanceInactive,
};

export { iconNameToSvg };
