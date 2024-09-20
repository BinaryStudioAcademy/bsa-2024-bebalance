import Animated, {
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { ChatMessage } from "~/libs/components/components";
import { NumericalValue } from "~/libs/enums/enums";
import { useEffect } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { ANIMATION_CONFIG } from "./libs/constants/constants";
import { DotDelays } from "./libs/enums/enums";
import { getAnimatedStyle } from "./libs/helpers/helpers";
import { styles } from "./styles";

const INITIAL_SCALE = -1;
const TARGET_SCALE = 1.5;
const INITIAL_SCALE_VALUE = 1;

const Loader: React.FC = () => {
	const scaleDot1 = useSharedValue(INITIAL_SCALE_VALUE);
	const scaleDot2 = useSharedValue(INITIAL_SCALE_VALUE);
	const scaleDot3 = useSharedValue(INITIAL_SCALE_VALUE);

	useEffect(() => {
		const scales = [scaleDot1, scaleDot2, scaleDot3];
		const delays = [DotDelays.DOT_1, DotDelays.DOT_2, DotDelays.DOT_3];

		for (const [index, scale] of scales.entries()) {
			const delay = delays[index] ?? NumericalValue.ZERO;
			scale.value = withDelay(
				delay,
				withRepeat(
					withTiming(TARGET_SCALE, ANIMATION_CONFIG),
					INITIAL_SCALE,
					true,
				),
			);
		}
	}, [scaleDot1, scaleDot2, scaleDot3]);

	const animatedStyle1 = getAnimatedStyle(scaleDot1);
	const animatedStyle2 = getAnimatedStyle(scaleDot2);
	const animatedStyle3 = getAnimatedStyle(scaleDot3);

	return (
		<ChatMessage isUser={false} style={globalStyles.mt8}>
			<Animated.View style={[globalStyles.flexDirectionRow, globalStyles.gap2]}>
				<Animated.Text style={[animatedStyle1, styles.dot]}>.</Animated.Text>
				<Animated.Text style={[animatedStyle2, styles.dot]}>.</Animated.Text>
				<Animated.Text style={[animatedStyle3, styles.dot]}>.</Animated.Text>
			</Animated.View>
		</ChatMessage>
	);
};

export { Loader };
