import React from "react";

import {
	BackgroundWrapper,
	Button,
	Link,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";

import { styles } from "./styles";

const Welcome: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const handleContinuePress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ_ENTRY);
	}, []);

	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.p12,
						styles.container,
					]}
				>
					<Text
						color={BaseColor.BG_WHITE}
						preset="heading"
						style={[globalStyles.mb12, styles.header]}
						weight="bold"
					>
						We're Analyzing{"\n"}Your Journey!
					</Text>
					<View
						style={[
							globalStyles.pt24,
							globalStyles.pr24,
							globalStyles.pb48,
							globalStyles.pl32,
							globalStyles.mb32,
							globalStyles.gap16,
							styles.text,
						]}
					>
						<Text color={BaseColor.BG_WHITE} size="sm" weight="regular">
							Thank you for sharing your insights! We’re currently processing
							your responses to create a personalized path just for you. This is
							where the magic begins—we’re using your input to tailor the
							experience, offering you the guidance and motivation you need to
							achieve a balanced, fulfilling life.
						</Text>
						<Text color={BaseColor.BG_WHITE} size="sm" weight="regular">
							Hang tight while we set things up! In just a moment, you’ll dive
							into the areas that matter most to you, and together, we’ll start
							making progress toward your goals. Your journey to a better life
							starts now!
						</Text>
					</View>
					<Button label="Let's Continue" onPress={handleContinuePress} />
					<Link
						label="Go to the Wheel"
						to={`/${RootScreenName.BOTTOM_TABS_NAVIGATOR}`}
					/>
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Welcome };
