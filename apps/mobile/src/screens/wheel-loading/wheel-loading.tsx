import React from "react";

import {
	BackgroundWrapper,
	ScreenWrapper,
	Text,
	View,
	WheelLoader,
} from "~/libs/components/components";
import { BaseColor, QuestionsStackName } from "~/libs/enums/enums";
import { useEffect, useNavigation, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type QuestionsStackNavigationParameterList,
} from "~/libs/types/types";

import { LoadingSetting } from "./libs/enums";

const ANIMATION_CYCLE_DURATION = 1000;

const WheelLoading: React.FC = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<QuestionsStackNavigationParameterList>
		>();
	const [percentLoading, setPercentLoading] = useState<number>(
		LoadingSetting.INITIAL_PERCENT,
	);

	useEffect(() => {
		if (percentLoading < LoadingSetting.MAX_PERCENT) {
			setTimeout(() => {
				const nextPercentLoading =
					percentLoading +
					(LoadingSetting.MAX_PERCENT *
						LoadingSetting.PROCESSING_STAGE_LENGTH) /
						LoadingSetting.PROCESSING_TIME_FINISH;
				setPercentLoading(nextPercentLoading);
			}, LoadingSetting.PROCESSING_STAGE_LENGTH);
		}
	}, [percentLoading]);

	useEffect(() => {
		if (percentLoading === LoadingSetting.MAX_PERCENT) {
			navigation.navigate(QuestionsStackName.BOTTOM_TABS);
		}
	}, [percentLoading, navigation]);

	return (
		<BackgroundWrapper planetLayout="wheelLoading">
			<ScreenWrapper>
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.gap16,
						globalStyles.justifyContentCenter,
						globalStyles.flexGrow1,
					]}
				>
					<WheelLoader
						animationDuration={ANIMATION_CYCLE_DURATION}
						size={LoadingSetting.WHEEL_SIZE}
					/>
					<Text color={BaseColor.BG_WHITE} preset="subheading">
						Analyzing{" "}
						{percentLoading.toFixed(LoadingSetting.PERCENT_DECIMALS_LENGTH)}%
					</Text>
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { WheelLoading };
