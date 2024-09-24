import ArrowNext from "~/assets/img/arrow-next.svg?react";
import CheckIcon from "~/assets/img/check-icon.svg?react";
import CheckSmall from "~/assets/img/check-small.svg?react";
import ClockActive from "~/assets/img/clock-active.svg?react";
import ClockInactive from "~/assets/img/clock-inactive.svg?react";
import Close from "~/assets/img/close.svg?react";
import CloseSmall from "~/assets/img/close-small.svg?react";
import CrossedEye from "~/assets/img/crossed-eye.svg?react";
import Error from "~/assets/img/error.svg?react";
import Eye from "~/assets/img/eye.svg?react";
import Info from "~/assets/img/info.svg?react";
import Menu from "~/assets/img/menu.svg?react";
import Note from "~/assets/img/note.svg?react";
import RoundedCheck from "~/assets/img/rounded-check.svg?react";
import SettingsActive from "~/assets/img/settings-active.svg?react";
import SettingsInactive from "~/assets/img/settings-inactive.svg?react";
import SignOut from "~/assets/img/sign-out.svg?react";
import Success from "~/assets/img/success.svg?react";
import TasksActive from "~/assets/img/tasks-active.svg?react";
import TasksInactive from "~/assets/img/tasks-inactive.svg?react";
import Upload from "~/assets/img/upload.svg?react";
import Warning from "~/assets/img/warning.svg?react";
import WheelOfBalanceActive from "~/assets/img/wheel-of-balance-active.svg?react";
import WheelOfBalanceInactive from "~/assets/img/wheel-of-balance-inactive.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	arrow_next: ArrowNext,
	check: CheckIcon,
	checkSmall: CheckSmall,
	clockActive: ClockActive,
	clockInactive: ClockInactive,
	close: Close,
	closeSmall: CloseSmall,
	crossedEye: CrossedEye,
	error: Error,
	eye: Eye,
	info: Info,
	menu: Menu,
	note: Note,
	roundedCheck: RoundedCheck,
	settingsActive: SettingsActive,
	settingsInactive: SettingsInactive,
	signOut: SignOut,
	success: Success,
	tasksActive: TasksActive,
	tasksInactive: TasksInactive,
	upload: Upload,
	warning: Warning,
	wheelActive: WheelOfBalanceActive,
	wheelInactive: WheelOfBalanceInactive,
};

export { iconNameToSvg };
