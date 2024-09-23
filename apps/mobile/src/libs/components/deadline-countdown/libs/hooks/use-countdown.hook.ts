import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
import { type Countdown } from "~/libs/types/types";

import { MillisecondsPerUnit } from "../../libs/enums/enums";
import { getFormattedCountdownUnits } from "../../libs/helpers/helpers";

const useCountdown = (deadline: string): Countdown => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);

	const handleCalculateDaysUntilDeadline = useCallback((): boolean => {
		const updatedCountdown = getFormattedCountdownUnits(deadline);

		if (
			updatedCountdown.days === COUNTDOWN_EXPIRED.days &&
			updatedCountdown.hours === COUNTDOWN_EXPIRED.hours &&
			updatedCountdown.minutes === COUNTDOWN_EXPIRED.minutes
		) {
			setCountdown(updatedCountdown);

			return true;
		}

		setCountdown(updatedCountdown);

		return false;
	}, [deadline]);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			const isExpired = handleCalculateDaysUntilDeadline();

			if (isExpired) {
				clearInterval(countdownInterval);
			}
		}, MillisecondsPerUnit.MINUTE);

		handleCalculateDaysUntilDeadline();

		return (): void => {
			clearInterval(countdownInterval);
		};
	}, [handleCalculateDaysUntilDeadline]);

	return countdown;
};

export { useCountdown };
