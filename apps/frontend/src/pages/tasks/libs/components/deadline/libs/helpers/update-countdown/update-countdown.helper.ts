import { COUNTDOWN_EXPIRED } from "../../constants/constants.js";
import { type CountdownUpdateHandlingData } from "../../types/types.js";
import { calculateCountdown } from "../calculate-countdown/calculate-countdown.helper.js";

const updateCountdown = ({
	deadline,
	onExpire,
	setCountdown,
	setIsExpired,
}: CountdownUpdateHandlingData): void => {
	const deadlineCountdown = calculateCountdown(deadline);
	setCountdown(deadlineCountdown);

	if (deadlineCountdown === COUNTDOWN_EXPIRED) {
		setIsExpired(true);
		onExpire();
	}
};

export { updateCountdown };
