import { type PageInterpolatorParams } from "react-native-infinite-pager";
import { interpolate, type useAnimatedStyle } from "react-native-reanimated";

import { NumericValues } from "../../../../libs/enums/enums";
import { ANIMATION_SCALE_FACTOR } from "../constants/constants";

const pageInterpolatorSlide = ({
	focusAnim,
	pageBuffer,
	pageWidth,
}: PageInterpolatorParams): ReturnType<typeof useAnimatedStyle> => {
	"worklet";

	const translateX = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericValues.ZERO, pageBuffer],
		[
			-pageWidth.value * ANIMATION_SCALE_FACTOR,
			NumericValues.ZERO,
			pageWidth.value * ANIMATION_SCALE_FACTOR,
		],
	);

	const opacity = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericValues.ZERO, pageBuffer],
		[NumericValues.ZERO, pageBuffer, NumericValues.ZERO],
	);

	const scale = interpolate(
		focusAnim.value,
		[-pageBuffer, NumericValues.ZERO, pageBuffer],
		[NumericValues.ZERO, pageBuffer, NumericValues.ZERO],
	);

	return {
		opacity,
		transform: [{ translateX }, { scale }],
	};
};

export { pageInterpolatorSlide };
