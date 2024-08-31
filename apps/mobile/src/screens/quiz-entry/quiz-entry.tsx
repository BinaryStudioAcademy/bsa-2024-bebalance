import React from "react";

import {
	BackgroundWrapper,
	Button,
	ScreenWrapper,
	Text,
	View,
	Wheel,
} from "~/libs/components/components";
import { GradientColor } from "~/libs/enums/enums";
import { useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

const mockData = [
	{ colors: GradientColor.YELLOW, label: "Physical", score: 9 },
	{ colors: GradientColor.LIME, label: "Work", score: 8 },
	{ colors: GradientColor.VIOLET, label: "Friends", score: 7 },
	{ colors: GradientColor.RED, label: "Love", score: 6 },
	{ colors: GradientColor.GREEN, label: "Money", score: 5 },
	{ colors: GradientColor.ROSE, label: "Free time", score: 8 },
	{ colors: GradientColor.ORANGE, label: "Spiritual", score: 5 },
	{ colors: GradientColor.BLUE, label: "Mental", score: 7 },
];

const QuizEntry: React.FC = () => {
	const handleStartPress = useCallback((): void => {}, []);

	const MAX_SCORE = 10;
	const WHEEL_SIZE = 250;

	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.gap48,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.p12,
						styles.container,
					]}
				>
					<Text preset="heading" style={styles.text} weight="extraBold">
						Craft your personal{"\n"}Life Balance Wheel!
					</Text>
					<View style={globalStyles.alignItemsCenter}>
						<Wheel
							categoriesData={mockData}
							maxScore={MAX_SCORE}
							size={WHEEL_SIZE}
						/>
					</View>
					<Text
						preset="subheading"
						style={[globalStyles.pb12, globalStyles.ph12, styles.text]}
						weight="bold"
					>
						Answer a few questions to find out which areas of your life are
						outstanding and which areas you are missing out on
					</Text>
					<Button label="Start" onPress={handleStartPress} />
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { QuizEntry };
