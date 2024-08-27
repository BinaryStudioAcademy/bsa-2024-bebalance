import { type PageInterpolatorParams } from "react-native-infinite-pager";
import { interpolate, type useAnimatedStyle } from "react-native-reanimated";

import { MULTIPLIER, ZERO } from "../constants/constants";

const pageInterpolatorSlide = ({
	focusAnim,
	pageWidth,
	pageBuffer,
}: PageInterpolatorParams): ReturnType<typeof useAnimatedStyle> => {
	"worklet";

	const translateX = interpolate(
		focusAnim.value,
		[-pageBuffer, ZERO, pageBuffer],
		[-pageWidth.value * MULTIPLIER, ZERO, pageWidth.value * MULTIPLIER],
	);

	const opacity = interpolate(
		focusAnim.value,
		[-pageBuffer, ZERO, pageBuffer],
		[ZERO, pageBuffer, ZERO],
	);

	const scale = interpolate(
		focusAnim.value,
		[-pageBuffer, ZERO, pageBuffer],
		[ZERO, pageBuffer, ZERO],
	);

	return {
		opacity,
		transform: [{ translateX }, { scale }],
	};
};

export { pageInterpolatorSlide };
