import { type SharedValue, useAnimatedStyle } from "react-native-reanimated";

type ReturnValue = {
	transform: { scale: number }[];
};

const useAnimatedScaleStyle = (
	scaleValue: SharedValue<number>,
): ReturnValue => {
	return useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleValue.value }],
		};
	});
};

export { useAnimatedScaleStyle };
