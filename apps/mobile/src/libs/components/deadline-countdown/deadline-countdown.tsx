import React from "react";

import ClockActive from "~/assets/svg/clock-active.svg";
import { Text, View } from "~/libs/components/components";
import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type Countdown } from "~/libs/types/types";

import { DEADLINE_OVER, TIME_PAD_FILL } from "./libs/constants/constants";
import { MillisecondsPerUnit, TimePad } from "./libs/enums/enums";

type Properties = {
	deadline: string;
};

const DeadlineCountdown: React.FC<Properties> = ({ deadline }) => {
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
		}, MillisecondsPerUnit.MINUTE);

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
