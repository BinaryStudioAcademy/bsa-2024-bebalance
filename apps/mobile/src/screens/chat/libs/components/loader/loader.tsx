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
import { DotDelay, ScaleValue } from "./libs/enums/enums";
import { useAnimatedScaleStyle } from "./libs/hooks/hooks";
import { styles } from "./styles";

const Loader: React.FC = () => {
	const scaleDot1 = useSharedValue(ScaleValue.DEFAULT);
	const scaleDot2 = useSharedValue(ScaleValue.DEFAULT);
	const scaleDot3 = useSharedValue(ScaleValue.DEFAULT);

	useEffect(() => {
		const scales = [scaleDot1, scaleDot2, scaleDot3];
		const delays = [DotDelay.DOT_1, DotDelay.DOT_2, DotDelay.DOT_3];

		for (const [index, scale] of scales.entries()) {
			const delay = delays[index] ?? NumericalValue.ZERO;
			scale.value = withDelay(
				delay,
				withRepeat(
					withTiming(ScaleValue.TARGET, ANIMATION_CONFIG),
					ScaleValue.INITIAL,
					true,
				),
			);
		}
	}, [scaleDot1, scaleDot2, scaleDot3]);

	const animatedStyle1 = useAnimatedScaleStyle(scaleDot1);
	const animatedStyle2 = useAnimatedScaleStyle(scaleDot2);
	const animatedStyle3 = useAnimatedScaleStyle(scaleDot3);

	return (
		<ChatMessage style={globalStyles.mt8}>
			<Animated.View style={[globalStyles.flexDirectionRow, globalStyles.gap2]}>
				<Animated.Text style={[animatedStyle1, styles.dot]}>.</Animated.Text>
				<Animated.Text style={[animatedStyle2, styles.dot]}>.</Animated.Text>
				<Animated.Text style={[animatedStyle3, styles.dot]}>.</Animated.Text>
			</Animated.View>
		</ChatMessage>
	);
};

export { Loader };
