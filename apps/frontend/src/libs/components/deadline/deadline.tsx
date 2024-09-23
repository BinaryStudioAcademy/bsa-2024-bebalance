import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks.js";

import { COUNTDOWN_EXPIRED } from "./libs/constants/constants.js";
import { MillisecondsPerUnit } from "./libs/enums/enums.js";
import { calculateCountdown } from "./libs/helpers/helpers.js";
import { type Countdown } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	deadline: string;
	onExpire: () => void;
};

const Deadline: React.FC<Properties> = ({ deadline, onExpire }: Properties) => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);
	const [isExpired, setIsExpired] = useState<boolean>(false);

	const clockIconName = isExpired ? "clockInactive" : "clockActive";
	const countdownStyleClass = getValidClassNames(
		styles["countdown"],
		isExpired && styles["expired"],
	);

	const handleUpdateCountdown = useCallback(() => {
		const deadlineCountdown = calculateCountdown(deadline);
		setCountdown(deadlineCountdown);

		if (deadlineCountdown === COUNTDOWN_EXPIRED) {
			setIsExpired(true);
			onExpire();
		}
	}, [deadline, onExpire]);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			handleUpdateCountdown();
		}, MillisecondsPerUnit.MINUTE);

		handleUpdateCountdown();

		return (): void => {
			clearInterval(countdownInterval);
		};
	}, [handleUpdateCountdown]);

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
