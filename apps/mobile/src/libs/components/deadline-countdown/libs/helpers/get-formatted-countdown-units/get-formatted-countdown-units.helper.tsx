import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { type Countdown } from "~/libs/types/types";

import { DEADLINE_OVER, TIME_PAD_FILL } from "../../constants/constants";
import { MillisecondsPerUnit, TimePad } from "../../enums/enums";

const getFormattedCountdownUnits = (deadline: string): Countdown => {
	const deadlineTime = new Date(deadline).getTime();
	const currentTime = Date.now();
	const timeToDeadline = deadlineTime - currentTime;

	if (timeToDeadline < DEADLINE_OVER) {
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

export { getFormattedCountdownUnits };
