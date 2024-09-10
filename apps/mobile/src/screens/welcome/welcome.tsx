import React, { useCallback, useEffect, useState } from "react";

import {
	BackgroundWrapper,
	Button,
	Link,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { createAnimatedText } from "~/libs/helpers/helpers";
import { useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";

import { AnalyzingText } from "./libs/constants/constants";
import { styles } from "./styles";

const Welcome: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const handleContinuePress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ_ENTRY);
	}, [navigation]);

	const [animatedText, setAnimatedText] = useState<React.ReactNode>([]);

	const handleAnimateText = useCallback(() => {
		setAnimatedText([]);
		const animatedWords = createAnimatedText(AnalyzingText);
		setAnimatedText(animatedWords);
	}, []);

	useEffect(() => {
		handleAnimateText();
	}, [handleAnimateText]);

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
						We&apos;re Analyzing{"\n"}Your Journey!
					</Text>
					<View
						style={[
							globalStyles.flexDirectionRow,
							globalStyles.pt24,
							globalStyles.pr24,
							globalStyles.pb48,
							globalStyles.pl32,
							globalStyles.mb32,
							styles.text,
						]}
					>
						{animatedText}
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
