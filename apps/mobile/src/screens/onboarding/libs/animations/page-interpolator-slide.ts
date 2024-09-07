import { type PageInterpolatorParams } from "react-native-infinite-pager";
import { interpolate, type useAnimatedStyle } from "react-native-reanimated";

import { ANIMATION_SCALE_FACTOR } from "../constants/constants";
import { AnimationDefaultValues } from "../enums/enums";

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
			-pageWidth.value * ANIMATION_SCALE_FACTOR,
			AnimationDefaultValues.ZERO,
			pageWidth.value * ANIMATION_SCALE_FACTOR,
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
