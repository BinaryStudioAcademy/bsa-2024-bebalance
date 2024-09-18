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

import {
	LETTERS_PRINTED_PER_STEP,
	NEXT_LETTERS_DELAY,
} from "./libs/constants/constants";
import { styles } from "./styles";

const paragraphs = [
	"Thank you for sharing your insights! We’re currently processing your responses to create a personalized path just for you. This is where the magic begins—we’re using your input to tailor the experience, offering you the guidance and motivation you need to achieve a balanced, fulfilling life.\n\nHang tight while we set things up! In just a moment, you’ll dive into the areas that matter most to you, and together, we’ll start making progress toward your goals. Your journey to a better life starts now!",
];

const Welcome: React.FC = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<QuestionsStackNavigationParameterList>
		>();

	const handleContinuePress = useCallback((): void => {
		navigation.navigate(QuestionsStackName.QUIZ_ENTRY);
	}, [navigation]);

	const typingParapraphs = paragraphs.map((paragraph, index) => {
		return (
			<TypingTextView
				key={index}
				lettersPrintedPerStep={LETTERS_PRINTED_PER_STEP}
				maskingColor={BaseColor.DARK_BLUE}
				nextLettersPrintedDelay={NEXT_LETTERS_DELAY}
				size="sm"
				textColor={BaseColor.BG_WHITE}
				weight="regular"
			>
				{paragraph}
			</TypingTextView>
		);
	});

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
						We&apos;re Analyzing{"\n"}Your Journey!
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
						{typingParapraphs}
					</View>
					<Button label="Let's Continue" onPress={handleContinuePress} />
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Welcome };
