import { type PageInterpolatorParams } from "react-native-infinite-pager";
import { interpolate, type useAnimatedStyle } from "react-native-reanimated";

import { AnimationDefaultValues } from "../constants/constants";

const pageInterpolatorSlide = ({
	focusAnim,
	pageBuffer,
	pageWidth,
}: PageInterpolatorParams): ReturnType<typeof useAnimatedStyle> => {
	"worklet";

	const translateX = interpolate(
		focusAnim.value,
		[-pageBuffer, AnimationDefaultValues.ZERO, pageBuffer],
		[
			-pageWidth.value * AnimationDefaultValues.MULTIPLIER,
			AnimationDefaultValues.ZERO,
			pageWidth.value * AnimationDefaultValues.MULTIPLIER,
		],
	);

	const opacity = interpolate(
		focusAnim.value,
		[-pageBuffer, AnimationDefaultValues.ZERO, pageBuffer],
		[AnimationDefaultValues.ZERO, pageBuffer, AnimationDefaultValues.ZERO],
	);

	const scale = interpolate(
		focusAnim.value,
		[-pageBuffer, AnimationDefaultValues.ZERO, pageBuffer],
		[AnimationDefaultValues.ZERO, pageBuffer, AnimationDefaultValues.ZERO],
	);

	return {
		opacity,
		transform: [{ translateX }, { scale }],
	};
};

export { pageInterpolatorSlide };
