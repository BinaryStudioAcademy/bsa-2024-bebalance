import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useEffect, useState } from "~/libs/hooks/hooks.js";

import { ONE_MINUTE } from "../../constants/constants.js";
import { getMillisecondsLeft } from "../../helpers/helpers.js";
import {
	COUNTDOWN_EXPIRED,
	TIME_PAD_FILL,
} from "./libs/constants/constants.js";
import { MillisecondsPerUnit, TimePad } from "./libs/enums/enums.js";
import { type Countdown } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	deadline: string;
	onExpire: (() => void) | undefined;
};

const Deadline: React.FC<Properties> = ({ deadline, onExpire }: Properties) => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);
	const [isExpired, setIsExpired] = useState<boolean>(false);

	const clockIconName = isExpired ? "clockInactive" : "clockActive";
	const countdownStyleClass = getValidClassNames(
		styles["countdown"],
		isExpired && styles["expired"],
	);

	useEffect(() => {
		const calculateDaysUntilDeadline = (): boolean => {
			const currentTime = Date.now();
			const timeToDeadline = getMillisecondsLeft(currentTime, deadline);

			if (timeToDeadline < ONE_MINUTE) {
				setCountdown(COUNTDOWN_EXPIRED);
				setIsExpired(true);
				onExpire?.();

				return true;
			}

			const days = Math.floor(timeToDeadline / MillisecondsPerUnit.DAY);
			const hours = Math.floor(
				(timeToDeadline % MillisecondsPerUnit.DAY) / MillisecondsPerUnit.HOUR,
			);
			const minutes = Math.floor(
				(timeToDeadline % MillisecondsPerUnit.HOUR) /
					MillisecondsPerUnit.MINUTE,
			);

			const formattedDays = String(days);
			const formattedHours = String(hours).padStart(
				TimePad.HOURS,
				TIME_PAD_FILL,
			);
			const formattedMinutes = String(minutes).padStart(
				TimePad.MINUTES,
				TIME_PAD_FILL,
			);

			setCountdown({
				days: formattedDays,
				hours: formattedHours,
				minutes: formattedMinutes,
			});

			return false;
		};

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
	}, [deadline, onExpire]);

	return (
		<div className={styles["container"]}>
			<Icon name={clockIconName} />
			<div className={countdownStyleClass}>
				<p className={styles["countdown-time"]}>{countdown.days}d</p>
				<p className={styles["countdown-time"]}>{countdown.hours}h</p>
				<p className={styles["countdown-time"]}>{countdown.minutes}m</p>
			</div>
		</div>
	);
};

export { Deadline };
