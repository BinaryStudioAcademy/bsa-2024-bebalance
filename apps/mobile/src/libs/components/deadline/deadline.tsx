import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "~/libs/components/components";
import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
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

const Deadline: React.FC<Properties> = ({ deadline }: Properties) => {
	const [countdown, setCountdown] = useState<Countdown>(COUNTDOWN_EXPIRED);
	const [isExpired, setIsExpired] = useState<boolean>(false);

	const countdownStyle = isExpired ? styles.expired : styles.countdown;

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
		<View style={styles.container}>
			<View style={countdownStyle}>
				<Text style={styles.countdownTime}>{countdown.days}d</Text>
				<Text style={styles.countdownTime}>{countdown.hours}h</Text>
				<Text style={styles.countdownTime}>{countdown.minutes}m</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
	},
	countdown: {
		flexDirection: "row",
		marginLeft: 8,
	},
	countdownTime: {
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 4,
	},
	expired: {
		color: "red",
		flexDirection: "row",
		marginLeft: 8,
	},
});

export { Deadline };
