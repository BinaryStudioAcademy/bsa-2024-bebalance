import wheelOfBalanceActive from "~/assets/img/wheel-of-balance-active.svg";
import wheelOfBalanceIncative from "~/assets/img/wheel-of-balance-inactive.svg";
import { IconName } from "~/libs/types/types.js";

const iconNameToSvg = new Map<IconName, string>();

iconNameToSvg.set("my-wheel-active", wheelOfBalanceActive);
iconNameToSvg.set("my-wheel-inactive", wheelOfBalanceIncative);

export { iconNameToSvg };
