import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import {
	COUNTDOWN_EXPIRED,
	DEADLINE_OVER,
	ONE_MINUTE,
	TIME_PAD_FILL,
} from "./libs/constants/constants.js";
import { MillisecondsPerUnit, TimePad } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	deadline: string;
};

const Deadline: React.FC<Properties> = ({ deadline }: Properties) => {
	const [countdown, setCountdown] = useState<string>(COUNTDOWN_EXPIRED);
	const [isExpired, setIsExpired] = useState<boolean>(false);

	const clockIconName = isExpired ? "clockInactive" : "clockActive";
	const countdonTimeStyleClass = getValidClassNames(
		styles["countdown-time"],
		isExpired && styles["expired"],
	);

	const calculateDaysUntilDeadline = useCallback((): boolean => {
		const deadlineTime = new Date(deadline).getTime();
		const currentTime = Date.now();
		const timeToDeadline = deadlineTime - currentTime;

		if (timeToDeadline < DEADLINE_OVER) {
			setCountdown(COUNTDOWN_EXPIRED);
			setIsExpired(true);

			return true;
		}

		const days = Math.floor(timeToDeadline / MillisecondsPerUnit.DAY);
		const hours = Math.floor(
			(timeToDeadline % MillisecondsPerUnit.DAY) / MillisecondsPerUnit.HOUR,
		);
		const minutes = Math.floor(
			(timeToDeadline % MillisecondsPerUnit.HOUR) / MillisecondsPerUnit.MINUTE,
		);

		const formattedHours = String(hours).padStart(TimePad.HOURS, TIME_PAD_FILL);
		const formattedMinutes = String(minutes).padStart(
			TimePad.MINUTES,
			TIME_PAD_FILL,
		);

		setCountdown(`${String(days)}:${formattedHours}:${formattedMinutes}`);

		return false;
	}, [deadline]);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			const isExpired = calculateDaysUntilDeadline();

			if (isExpired) {
				clearInterval(countdownInterval);
			}
		}, ONE_MINUTE);

		calculateDaysUntilDeadline();

		return (): void => {
			clearInterval(countdownInterval);
		};
	}, [calculateDaysUntilDeadline]);

	return (
		<div className={styles["container"]}>
			<Icon name={clockIconName} />
			<p className={countdonTimeStyleClass}>{countdown}</p>
		</div>
	);
};

export { Deadline };
