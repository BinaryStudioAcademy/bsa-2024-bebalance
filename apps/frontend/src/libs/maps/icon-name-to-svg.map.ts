import WheelOfBalanceActive from "~/assets/img/wheel-of-balance-active.svg";
import WheelOfBalanceInactive from "~/assets/img/wheel-of-balance-inactive.svg";
import { IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	myWheelActive: WheelOfBalanceActive,
	myWheelInactive: WheelOfBalanceInactive,
};

export { iconNameToSvg };
