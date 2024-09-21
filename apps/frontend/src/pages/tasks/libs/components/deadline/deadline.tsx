import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useEffect, useState } from "~/libs/hooks/hooks.js";

import { ONE_MINUTE_IN_MILLISECONDS } from "../../constants/constants.js";
import { COUNTDOWN_EXPIRED } from "./libs/constants/constants.js";
import { updateCountdown } from "./libs/helpers/helpers.js";
import {
	type Countdown,
	type CountdownUpdateHandlingData,
} from "./libs/types/types.js";
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

	useEffect(() => {
		const updateHandlingData: CountdownUpdateHandlingData = {
			deadline,
			onExpire,
			setCountdown,
			setIsExpired,
		};

		const countdownInterval = setInterval(() => {
			updateCountdown(updateHandlingData);
		}, ONE_MINUTE_IN_MILLISECONDS);

		updateCountdown(updateHandlingData);

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
