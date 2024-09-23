import React from "react";

import ClockActive from "~/assets/svg/clock-active.svg";
import { Text, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { useCountdown } from "./libs/hooks/hooks";

type Properties = {
	deadline: string;
};

const DeadlineCountdown: React.FC<Properties> = ({ deadline }) => {
	const countdown = useCountdown(deadline);

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
