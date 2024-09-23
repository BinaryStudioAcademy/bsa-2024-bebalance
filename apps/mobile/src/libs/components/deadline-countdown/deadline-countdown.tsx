import React from "react";

import ClockActive from "~/assets/svg/clock-active.svg";
import { Text, View } from "~/libs/components/components";
import { COUNTDOWN_EXPIRED } from "~/libs/constants/constants";
import { useCallback, useEffect, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type Countdown } from "~/libs/types/types";

import { MillisecondsPerUnit } from "./libs/enums/enums";
import { getFormattedCountdownUnits } from "./libs/helpers/helpers";

type Properties = {
	deadline: string;
};

const DeadlineCountdown: React.FC<Properties> = ({ deadline }) => {
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
