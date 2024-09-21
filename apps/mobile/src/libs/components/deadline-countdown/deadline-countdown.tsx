import React from "react";

import ClockActive from "~/assets/svg/clock-active.svg";
import { Text, View } from "~/libs/components/components";
import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type Countdown } from "~/libs/types/types";

type Properties = {
	deadline: string;
};

const DEADLINE_OVER = 0;

const ONE_MINUTE = 60_000;

const TIME_PAD_FILL = "0";

const MillisecondsPerUnit = {
	DAY: 86_400_000,
	HOUR: 3_600_000,
	MINUTE: 60_000,
} as const;

const TimePad = {
	HOURS: 2,
	MINUTES: 2,
} as const;

const DeadlineCountdown: React.FC<Properties> = ({ deadline }: Properties) => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);

	const handleCalculateDaysUntilDeadline = useCallback((): boolean => {
		const deadlineTime = new Date(deadline).getTime();
		const currentTime = Date.now();
		const timeToDeadline = deadlineTime - currentTime;

		if (timeToDeadline < DEADLINE_OVER) {
			setCountdown(COUNTDOWN_EXPIRED);

			return true;
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

		setCountdown({
			days: formattedDays,
			hours: formattedHours,
			minutes: formattedMinutes,
		});

		return false;
	}, [deadline]);

	useEffect(() => {
		const countdownInterval = setInterval(() => {
			const isExpired = handleCalculateDaysUntilDeadline();

			if (isExpired) {
				clearInterval(countdownInterval);
			}
		}, ONE_MINUTE);

		handleCalculateDaysUntilDeadline();

		return (): void => {
			clearInterval(countdownInterval);
		};
	}, [handleCalculateDaysUntilDeadline]);

	return (
		<View
			style={[globalStyles.alignItemsCenter, globalStyles.flexDirectionRow]}
		>
			<ClockActive />
			<View style={[globalStyles.flexDirectionRow, globalStyles.ml8]}>
				<Text preset="regular" style={globalStyles.mr4} weight="bold">
					{countdown.days}d
				</Text>
				<Text preset="regular" style={globalStyles.mr4} weight="bold">
					{countdown.hours}h
				</Text>
				<Text preset="regular" style={globalStyles.mr4} weight="bold">
					{countdown.minutes}m
				</Text>
			</View>
		</View>
	);
};

export { DeadlineCountdown };
