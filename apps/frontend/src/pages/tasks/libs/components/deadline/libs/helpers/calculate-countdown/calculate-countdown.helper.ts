import { ONE_MINUTE_IN_MILLISECONDS } from "~/pages/tasks/libs/constants/constants.js";
import { getMillisecondsLeft } from "~/pages/tasks/libs/helpers/helpers.js";

import { COUNTDOWN_EXPIRED, TIME_PAD_FILL } from "../../constants/constants.js";
import { MillisecondsPerUnit, TimePad } from "../../enums/enums.js";
import { type Countdown } from "../../types/types.js";

const calculateCountdown = (targetDate: string): Countdown => {
	const currentTime = Date.now();
	const timeToDeadline = getMillisecondsLeft(currentTime, targetDate);

	if (timeToDeadline < ONE_MINUTE_IN_MILLISECONDS) {
		return COUNTDOWN_EXPIRED;
	}

	const days = Math.floor(timeToDeadline / MillisecondsPerUnit.DAY);
	const hours = Math.floor(
		(timeToDeadline % MillisecondsPerUnit.DAY) / MillisecondsPerUnit.HOUR,
	);
	const minutes = Math.floor(
		(timeToDeadline % MillisecondsPerUnit.HOUR) / MillisecondsPerUnit.MINUTE,
	);

	const formattedDays = String(days);
	const formattedHours = String(hours).padStart(TimePad.HOURS, TIME_PAD_FILL);
	const formattedMinutes = String(minutes).padStart(
		TimePad.MINUTES,
		TIME_PAD_FILL,
	);

	return {
		days: formattedDays,
		hours: formattedHours,
		minutes: formattedMinutes,
	};
};

export { calculateCountdown };
