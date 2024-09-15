import CheckIcon from "~/assets/img/check-icon.svg?react";
import ClockActive from "~/assets/img/clock-active.svg?react";
import ClockInactive from "~/assets/img/clock-inactive.svg?react";
import Close from "~/assets/img/close.svg?react";
import CrossedEye from "~/assets/img/crossed-eye.svg?react";
import Eye from "~/assets/img/eye.svg?react";
import Menu from "~/assets/img/menu.svg?react";
import RoundedCheck from "~/assets/img/rounded-check.svg?react";
import SettingsActive from "~/assets/img/settings-active.svg?react";
import SettingsInactive from "~/assets/img/settings-inactive.svg?react";
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
	clockActive: ClockActive,
	clockInactive: ClockInactive,
	close: Close,
	crossedEye: CrossedEye,
	eye: Eye,
	menu: Menu,
	roundedCheck: RoundedCheck,
	settingsActive: SettingsActive,
	settingsInactive: SettingsInactive,
	tasksActive: TasksActive,
	tasksInactive: TasksInactive,
	wheelActive: WheelOfBalanceActive,
	wheelInactive: WheelOfBalanceInactive,
};

export { iconNameToSvg };
