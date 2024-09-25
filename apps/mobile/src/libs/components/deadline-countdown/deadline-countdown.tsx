import React from "react";

import ClockActive from "~/assets/svg/clock-active.svg";
import ClockExpired from "~/assets/svg/clock-expired.svg";
import { Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { useCountdown } from "./libs/hooks/hooks";

type Properties = {
	deadline: string;
	isExpired?: boolean;
	onExpire?: () => void;
};

const DeadlineCountdown: React.FC<Properties> = ({
	deadline,
	isExpired = false,
	onExpire = (): void => {},
}) => {
	const { days, hours, minutes } = useCountdown({ deadline, onExpire });
	const countdownColor = isExpired ? BaseColor.RED : BaseColor.BLACK;

	return (
		<View
			style={[globalStyles.alignItemsCenter, globalStyles.flexDirectionRow]}
		>
			{isExpired ? <ClockExpired /> : <ClockActive />}
			<View style={[globalStyles.flexDirectionRow, globalStyles.ml8]}>
				<Text
					color={countdownColor}
					preset="regular"
					style={globalStyles.mr4}
					weight="bold"
				>
					{days}d
				</Text>
				<Text
					color={countdownColor}
					preset="regular"
					style={globalStyles.mr4}
					weight="bold"
				>
					{hours}h
				</Text>
				<Text
					color={countdownColor}
					preset="regular"
					style={globalStyles.mr4}
					weight="bold"
				>
					{minutes}m
				</Text>
			</View>
		</View>
	);
};

export { DeadlineCountdown };
