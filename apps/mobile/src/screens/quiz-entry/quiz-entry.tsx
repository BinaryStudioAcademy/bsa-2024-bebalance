import React from "react";

import {
	BackgroundWrapper,
	Button,
	Image,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type ImageSourcePropType,
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";

import { styles } from "./styles";

const QuizEntry: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const handleStartPress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ);
	}, [navigation]);

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
					<Image
						source={
							require("~/assets/images/balance-wheel.png") as ImageSourcePropType
						}
						style={styles.image}
					/>
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
