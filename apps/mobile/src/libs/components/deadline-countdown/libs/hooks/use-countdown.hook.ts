import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
import { type Countdown } from "~/libs/types/types";

import { MillisecondsPerUnit } from "../../libs/enums/enums";
import { getFormattedCountdownUnits } from "../../libs/helpers/helpers";

const useCountdown = (deadline: string): Countdown => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);

	const handleCalculateCountdown = useCallback((): Countdown => {
		return getFormattedCountdownUnits(deadline);
	}, [deadline]);

	const isExpired = useCallback(
		({ days, hours, minutes }: Countdown): boolean => {
			return (
				days === COUNTDOWN_EXPIRED.days &&
				hours === COUNTDOWN_EXPIRED.hours &&
				minutes === COUNTDOWN_EXPIRED.minutes
			);
		},
		[],
	);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			const updatedCountdown = handleCalculateCountdown();
			setCountdown(updatedCountdown);

			if (isExpired(updatedCountdown)) {
				clearInterval(countdownInterval);
			}
		}, MillisecondsPerUnit.MINUTE);

		const initialCountdown = handleCalculateCountdown();
		setCountdown(initialCountdown);

		return (): void => {
			clearInterval(countdownInterval);
		};
	}, [handleCalculateCountdown, isExpired]);

	return countdown;
};

export { useCountdown };
