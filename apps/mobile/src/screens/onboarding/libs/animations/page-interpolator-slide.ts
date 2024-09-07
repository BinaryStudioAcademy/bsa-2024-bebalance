import { type PageInterpolatorParams } from "react-native-infinite-pager";
import { interpolate, type useAnimatedStyle } from "react-native-reanimated";

import { NumericalValue } from "../../../../libs/enums/enums";
import { ANIMATION_SCALE_FACTOR } from "../constants/constants";

const pageInterpolatorSlide = ({
	focusAnim,
	pageBuffer,
	pageWidth,
}: PageInterpolatorParams): ReturnType<typeof useAnimatedStyle> => {
	"worklet";

	const translateX = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericalValue.ZERO, pageBuffer],
		[
			-pageWidth.value * ANIMATION_SCALE_FACTOR,
			NumericalValue.ZERO,
			pageWidth.value * ANIMATION_SCALE_FACTOR,
		],
	);

	const opacity = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericalValue.ZERO, pageBuffer],
		[NumericalValue.ZERO, pageBuffer, NumericalValue.ZERO],
	);

	const scale = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericalValue.ZERO, pageBuffer],
		[NumericalValue.ZERO, pageBuffer, NumericalValue.ZERO],
	);

	return {
		opacity,
		transform: [{ translateX }, { scale }],
	};
};

export { pageInterpolatorSlide };
