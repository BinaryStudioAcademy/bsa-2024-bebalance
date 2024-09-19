import {
	BackgroundWrapper,
	Button,
	ScreenWrapper,
	Text,
	TypingTextView,
	View,
} from "~/libs/components/components";
import { BaseColor, QuestionsStackName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type QuestionsStackNavigationParameterList,
} from "~/libs/types/types";

import { styles } from "./styles";

const Introduction: React.FC = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<QuestionsStackNavigationParameterList>
		>();
	const handleContinuePress = useCallback((): void => {
		navigation.navigate(QuestionsStackName.ONBOARDING);
	}, [navigation]);

	return (
		<BackgroundWrapper planetLayout="welcome">
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
						Welcome to BeBalance!
					</Text>
					<View
						style={[
							globalStyles.pt24,
							globalStyles.ph24,
							globalStyles.pb48,
							globalStyles.mb32,
							globalStyles.alignItemsCenter,
							styles.textWrapper,
						]}
					>
						<TypingTextView
							maskingColor={BaseColor.DARK_BLUE}
							preset="heading"
							style={styles.text}
							textColor={BaseColor.BG_WHITE}
							weight="regular"
						>
							You are on the right way to achieving life balance...
						</TypingTextView>
					</View>
					<Button label="Let's Start" onPress={handleContinuePress} />
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Introduction };
